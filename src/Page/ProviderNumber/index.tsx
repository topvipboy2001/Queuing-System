import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { providerGetAction } from "../../State/Actions/ProvidersActions";
import { RootStore } from "../../State/Store";
import ProviderNumberLayout from "./Components/ProviderNumberLayout";

const ProviderNumber = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.providers);

  useEffect(() => {
    try {
      dispatch(providerGetAction());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return <ProviderNumberLayout loading={state.loading} data={state.current} />;
};

export default ProviderNumber;
