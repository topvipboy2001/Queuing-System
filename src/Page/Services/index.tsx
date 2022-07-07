import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serviceGetAction } from "../../State/Actions/ServicesActions";
import { RootStore } from "../../State/Store";
import ServicesLayout from "./Components/ServicesLayout";

const Services = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.services);

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

  return <ServicesLayout loading={state.loading} data={state.current} />;
};

export default Services;
