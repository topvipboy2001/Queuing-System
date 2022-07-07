import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serviceGetAction } from "../../State/Actions/ServicesActions";
import { RootStore } from "../../State/Store";
import ProviderNumberAddLayout from "./Components/ProviderNumberAddLayout";

const ProviderNumberAdd = () => {
  const dispatch = useDispatch();
  const servicesState = useSelector((state: RootStore) => state.services);
  const state = useSelector((state: RootStore) => state.providers);

  useEffect(() => {
    const fetchService = async () => {
      try {
        await dispatch(serviceGetAction());
      } catch (error) {
        console.log(error);
      }
    };

    fetchService();
  }, [dispatch]);

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <ProviderNumberAddLayout
      servicesLoading={servicesState.loading}
      servicesData={servicesState.current}
      loading={state.loading}
      onFinish={onFinish}
    />
  );
};

export default ProviderNumberAdd;
