import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deviceGetByIdAction } from "../../State/Actions/DevicesActions";
import { RootStore } from "../../State/Store";
import DeviceDetailLayout from "./Components/DeviceDetailLayout";

const DeviceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.device);

  useEffect(() => {
    const fetchDeviceById = async () => {
      try {
        if (typeof id !== "undefined") {
          dispatch(deviceGetByIdAction(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeviceById();
  }, [id, dispatch]);

  return <DeviceDetailLayout loading={state.loading} data={state.current} />;
};

export default DeviceDetail;
