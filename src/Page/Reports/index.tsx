import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reportsGetAction,
  reportsGetByFilterAction,
} from "../../State/Actions/ReportsActions";
import { ReportFilterType } from "../../State/ActionTypes/ReportsActionTypes";
import { RootStore } from "../../State/Store";
import ReportsLayout from "./Components/ReportsLayout";

const Reports = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.reports);
  const [form] = useForm();

  const onFinish = async (values: ReportFilterType) => {
    try {
      await dispatch(reportsGetByFilterAction(values));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        dispatch(reportsGetAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchReport();
  }, [dispatch]);

  return (
    <ReportsLayout
      loading={state.loading}
      data={state.current}
      onFinish={onFinish}
      form={form}
    />
  );
};

export default Reports;
