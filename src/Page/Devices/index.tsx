import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deviceGetAction } from "../../State/Actions/DevicesActions";
import { RootStore } from "../../State/Store";
import DevicesLayout from "./Components/DevicesLayout";

const Devices = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.devices);

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

  return <DevicesLayout loading={state.loading} data={state.current} />;
};

export default Devices;
