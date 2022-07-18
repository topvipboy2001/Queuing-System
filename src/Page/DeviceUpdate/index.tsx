import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deviceGetByIdAction,
  deviceUpdateByIdAction,
} from "../../State/Actions/DevicesActions";
import { deviceTypeGetAction } from "../../State/Actions/DevicesTypeActions";
import { serviceGetAction } from "../../State/Actions/ServicesActions";
import { DeviceAddType } from "../../State/ActionTypes/DevicesActionTypes";
import { RootStore } from "../../State/Store";
import DeviceUpdateLayout from "./Components/DeviceUpdateLayout";

const DeviceUpdate = () => {
  const dispatch = useDispatch();
  const deviceTypeState = useSelector((state: RootStore) => state.deviceTypes);
  const servicesState = useSelector((state: RootStore) => state.services);
  const state = useSelector((state: RootStore) => state.device);
  const loading = useSelector((state: RootStore) => state.devices.loading);
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          await dispatch(deviceGetByIdAction(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    setInitialValues({
      id: state.current.id,
      deviceType: state.current.deviceType.id,
      name: state.current.name,
      username: state.current.username,
      IPAddress: state.current.IPAddress,
      password: state.current.password,
      services: state.current.services.map((item: { id: string }) => item.id),
    });

    // eslint-disable-next-line
  }, [state.current]);

  const onFinish = async (values: DeviceAddType) => {
    try {
      await dispatch(deviceUpdateByIdAction(values));
      message.success("cập nhật thành công");
    } catch (error: any) {
      message.error(error);
    }
  };

  return (
    <DeviceUpdateLayout
      initialValues={initialValues}
      loading={loading}
      deviceTypeLoading={deviceTypeState.loading}
      deviceTypeData={deviceTypeState.current}
      serviceData={servicesState.current}
      serviceLoading={servicesState.loading}
      onFinish={onFinish}
    />
  );
};

export default DeviceUpdate;
