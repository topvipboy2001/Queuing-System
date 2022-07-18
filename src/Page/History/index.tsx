import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  historyGetAction,
  historyGetWithFilterAction,
} from "../../State/Actions/HistoryActions";
import { HistoryFilterType } from "../../State/ActionTypes/HistoryActionTypes";
import { RootStore } from "../../State/Store";
import HistoryLayout from "./Components/HistoryLayout";

const History = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.history);
  const [form] = useForm();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        await dispatch(historyGetAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, [dispatch]);

  const onFinish = async (values: HistoryFilterType) => {
    try {
      console.log(values);
      await dispatch(historyGetWithFilterAction(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HistoryLayout
      loading={state.loading}
      data={state.current}
      form={form}
      onFinish={onFinish}
    />
  );
};

export default History;
