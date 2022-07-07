import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deviceAddAction } from "../../State/Actions/DevicesActions";
import { deviceTypeGetAction } from "../../State/Actions/DevicesTypeActions";
import { serviceGetAction } from "../../State/Actions/ServicesActions";
import { DeviceAddType } from "../../State/ActionTypes/DevicesActionTypes";
import { RootStore } from "../../State/Store";
import DeviceAddLayout from "./Components/DeviceAddLayout";

const DeviceAdd = () => {
  const dispatch = useDispatch();
  const deviceTypeState = useSelector((state: RootStore) => state.deviceTypes);
  const servicesState = useSelector((state: RootStore) => state.services);
  const state = useSelector((state: RootStore) => state.devices);

  useEffect(() => {
    const fetchDeviceType = async () => {
      try {
        await dispatch(deviceTypeGetAction());
      } catch (error) {
        console.log(error);
      }
    };

    const fetchService = async () => {
      try {
        await dispatch(serviceGetAction());
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();

    fetchDeviceType();
  }, [dispatch]);

  const onFinish = async (values: DeviceAddType) => {
    try {
      await dispatch(deviceAddAction(values));
      message.success("Thêm thiết bị thành công");
    } catch (error: any) {
      message.error(error);
    }
  };

  return (
    <DeviceAddLayout
      loading={state.loading}
      deviceTypeLoading={deviceTypeState.loading}
      deviceTypeData={deviceTypeState.current}
      serviceData={servicesState.current}
      serviceLoading={servicesState.loading}
      onFinish={onFinish}
    />
  );
};

export default DeviceAdd;
