import { message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { serviceAddAction } from "../../State/Actions/ServicesActions";
import { ServiceAddType } from "../../State/ActionTypes/ServicesActionTypes";
import { RootStore } from "../../State/Store";
import ServiceAddLayout from "./Components/ServiceAddLayout";

const ServiceAdd = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.services);

  const onFinish = async (values: any) => {
    const valueFormat: ServiceAddType = {
      id: values.id,
      name: values.name,
      description: values.description ? values.description : null,
      increase: {
        from: values.increaseFrom ? values.increaseFrom : null,
        to: values.increaseTo ? values.increaseTo : null,
      },
      prefix: values.prefix ? values.prefix : null,
      surfix: values.surfix ? values.surfix : null,
      isReset: values.isReset,
    };

    try {
      await dispatch(serviceAddAction(valueFormat));
      message.success("Thêm dịch vụ thành công!");
    } catch (error: any) {
      message.error(error);
    }
  };

  return <ServiceAddLayout loading={state.loading} onFinish={onFinish} />;
};

export default ServiceAdd;
