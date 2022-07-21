import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { providerAddAction } from "../../State/Actions/ProvidersActions";
import { serviceGetAction } from "../../State/Actions/ServicesActions";
import { ProviderAddType } from "../../State/ActionTypes/ProvidersActionTypes";
import { RootStore } from "../../State/Store";
import ProviderNumberAddLayout from "./Components/ProviderNumberAddLayout";
import ModalUserInfo from "./Components/ModalUserInfo";
import ModalComplete from "./Components/ModalComplete";

interface IOnFinishModalUserInfo {
  name: string;
  phoneNumber: string;
  email: string;
}

const ProviderNumberAdd = () => {
  const dispatch = useDispatch();
  const servicesState = useSelector((state: RootStore) => state.services);
  const state = useSelector((state: RootStore) => state.providers);
  const providerState = useSelector((state: RootStore) => state.provider);
  const [modalCompleteVisible, setModalCompleteVisible] = useState(false);
  const [modalUserInfoVisible, setModalUserInfoVisible] = useState(false);
  const [service, setService] = useState("");

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

  const onFinish = async (values: { service: string }) => {
    setService(values.service);
    setModalUserInfoVisible(true);
  };

  const onFinishModalUserInfo = async (values: IOnFinishModalUserInfo) => {
    try {
      const data: ProviderAddType = {
        customerName: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email ? values.email : null,
        service: service,
      };

      await dispatch(providerAddAction(data));
      setModalUserInfoVisible(false);
      setModalCompleteVisible(true);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ProviderNumberAddLayout
        servicesLoading={servicesState.loading}
        servicesData={servicesState.current}
        loading={state.loading}
        onFinish={onFinish}
      />
      <ModalComplete
        providerData={providerState.current}
        modalVisible={modalCompleteVisible}
        setModalVisible={setModalCompleteVisible}
      />
      <ModalUserInfo
        modalUserInfoVisible={modalUserInfoVisible}
        setModalUserInfoVisible={setModalUserInfoVisible}
        onFinishModalUserInfo={onFinishModalUserInfo}
        loading={state.loading}
      />
    </>
  );
};

export default ProviderNumberAdd;
