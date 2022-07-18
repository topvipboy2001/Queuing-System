import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deviceGetAction,
  deviceGetByFilterAction,
} from "../../State/Actions/DevicesActions";
import { DeviceFilterType } from "../../State/ActionTypes/DevicesActionTypes";
import { RootStore } from "../../State/Store";
import DevicesLayout from "./Components/DevicesLayout";

const Devices = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.devices);
  const [form] = useForm();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        await dispatch(deviceGetAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchDevices();
  }, [dispatch]);

  const onFinish = async (values: DeviceFilterType) => {
    try {
      await dispatch(deviceGetByFilterAction(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DevicesLayout
      loading={state.loading}
      data={state.current}
      form={form}
      onFinish={onFinish}
    />
  );
};

export default Devices;
