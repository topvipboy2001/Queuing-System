import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardGetAction } from "../../State/Actions/DashBoardActions";
import { RootStore } from "../../State/Store";
import DashboardLayout from "./Components/DashboardLayout";

const Dashboard = () => {
  const [date, setDate] = useState<DayValue>(null);
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.dashboard);

  useEffect(() => {
    const fetchDashBoardSummary = async () => {
      try {
        await dispatch(dashboardGetAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashBoardSummary();
  }, [dispatch]);

  return (
    <DashboardLayout
      date={date}
      setDate={setDate}
      loading={state.loading}
      data={state.current}
    />
  );
};

export default Dashboard;
