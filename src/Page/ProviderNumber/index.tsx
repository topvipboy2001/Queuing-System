import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  providerGetAction,
  providerGetByFilterAction,
} from "../../State/Actions/ProvidersActions";
import { serviceGetAction } from "../../State/Actions/ServicesActions";
import { sourceProviderGetAction } from "../../State/Actions/SourceProvidersActions";
import { ProviderFilterType } from "../../State/ActionTypes/ProvidersActionTypes";
import { RootStore } from "../../State/Store";
import ProviderNumberLayout from "./Components/ProviderNumberLayout";

const ProviderNumber = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.providers);
  const servicesState = useSelector((state: RootStore) => state.services);
  const sourceProviderState = useSelector(
    (state: RootStore) => state.sourceProvider
  );
  const [form] = useForm();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        await dispatch(providerGetAction());
        await dispatch(serviceGetAction());
        await dispatch(sourceProviderGetAction());
      } catch (error) {
        console.log(error);
      }
    };

    fetchProvider();
  }, [dispatch]);

  const onFinish = async (values: ProviderFilterType) => {
    try {
      await dispatch(providerGetByFilterAction(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProviderNumberLayout
      loading={state.loading}
      data={state.current}
      serviceData={servicesState.current}
      serviceLoading={servicesState.loading}
      sourceProvidersLoading={sourceProviderState.loading}
      sourceProvidersData={sourceProviderState.current}
      onFinish={onFinish}
      form={form}
    />
  );
};

export default ProviderNumber;
