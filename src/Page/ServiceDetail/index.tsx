import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { serviceGetByIdAction } from "../../State/Actions/ServicesActions";
import { RootStore } from "../../State/Store";
import ServiceDetailLayout from "./Components/ServiceDetailLayout";

const ServiceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.service);

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (typeof id === "string") await dispatch(serviceGetByIdAction(id));
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
  }, [dispatch, id]);

  return <ServiceDetailLayout data={state.current} />;
};

export default ServiceDetail;
