import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { providerGetByIdAction } from "../../State/Actions/ProvidersActions";
import { RootStore } from "../../State/Store";
import ProviderNumberDetailLayout from "./Components/ProviderNumberDetailLayout";

const ProviderNumberDetail = () => {
  const { id } = useParams();
  const state = useSelector((state: RootStore) => state.provider);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        if (id) {
          await dispatch(providerGetByIdAction(id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProvider();
  }, [dispatch, id]);

  return (
    <ProviderNumberDetailLayout loading={state.loading} data={state.current} />
  );
};

export default ProviderNumberDetail;
