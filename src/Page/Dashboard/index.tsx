import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardGetAction,
  dashboardGetProviderChartWeekAction,
  dashboardGetProviderChartMonthAction,
  dashboardGetProviderChartDayAction,
} from "../../State/Actions/DashBoardActions";
import { RootStore } from "../../State/Store";
import DashboardLayout from "./Components/DashboardLayout";

const Dashboard = () => {
  const today = moment().toObject();
  const [date, setDate] = useState<DayValue>({
    day: today.date,
    month: today.months + 1,
    year: today.years,
  });

  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.dashboard);
  const [chartType, setChartType] = useState("day");

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

  useEffect(() => {
    const fetchDataChart = async () => {
      if (date) {
        switch (chartType) {
          case "day":
            await dispatch(
              dashboardGetProviderChartDayAction({
                day: date.day,
                month: date.month,
                year: date.year,
              })
            );
            break;
          case "week":
            await dispatch(
              dashboardGetProviderChartWeekAction({
                day: date.day,
                month: date.month,
                year: date.year,
              })
            );
            break;
          case "month":
            await dispatch(
              dashboardGetProviderChartMonthAction({
                month: date.month,
                year: date.year,
              })
            );
            break;

          default:
            await dispatch(
              dashboardGetProviderChartDayAction({
                day: date.day,
                month: date.month,
                year: date.year,
              })
            );
            break;
        }
      }
    };
    fetchDataChart();
    //eslint-disable-next-line
  }, [date, chartType]);

  return (
    <DashboardLayout
      date={date}
      setDate={setDate}
      loading={state.loading}
      data={state.current}
      chartData={state.providerChart}
      chartType={chartType}
      setChartType={setChartType}
    />
  );
};

export default Dashboard;
