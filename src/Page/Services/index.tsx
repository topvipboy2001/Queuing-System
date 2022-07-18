import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  serviceGetAction,
  serviceGetByFilterAction,
} from "../../State/Actions/ServicesActions";
import { ServiceFilterType } from "../../State/ActionTypes/ServicesActionTypes";
import { RootStore } from "../../State/Store";
import ServicesLayout from "./Components/ServicesLayout";

const Services = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.services);
  const [form] = useForm();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        dispatch(serviceGetAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, [dispatch]);

  const onFinish = async (values: ServiceFilterType) => {
    try {
      await dispatch(serviceGetByFilterAction(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ServicesLayout
      loading={state.loading}
      data={state.current}
      form={form}
      onFinish={onFinish}
    />
  );
};

export default Services;
