import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  providerGetByServiceIdAction,
  providerGetByServiceIdWithFilterAction,
} from "../../State/Actions/ProvidersActions";
import { serviceGetByIdAction } from "../../State/Actions/ServicesActions";
import { ProviderFilterGetServiceIDType } from "../../State/ActionTypes/ProvidersActionTypes";
import { RootStore } from "../../State/Store";
import ServiceDetailLayout from "./Components/ServiceDetailLayout";

const ServiceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.service);
  const providerState = useSelector((state: RootStore) => state.providers);
  const [form] = useForm();

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          await dispatch(serviceGetByIdAction(id));
          await dispatch(providerGetByServiceIdAction(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  }, [dispatch, id]);

  const onFinish = async (values: ProviderFilterGetServiceIDType) => {
    try {
      if (id) {
        await dispatch(providerGetByServiceIdWithFilterAction(values));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ServiceDetailLayout
      data={state.current}
      providerData={providerState.subCurrent}
      providerLoading={providerState.loading}
      form={form}
      onFinish={onFinish}
      id={id}
    />
  );
};

export default ServiceDetail;
