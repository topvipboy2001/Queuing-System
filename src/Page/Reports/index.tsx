import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportsGetAction } from "../../State/Actions/ReportsActions";
import { RootStore } from "../../State/Store";
import ReportsLayout from "./Components/ReportsLayout";

const Reports = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.reports);

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

  return <ReportsLayout loading={state.loading} data={state.current} />;
};

export default Reports;
