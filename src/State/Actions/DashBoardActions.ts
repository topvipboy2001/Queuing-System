import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  getDaysInMonth,
  getMonthInYear,
  getWeekInMonth,
  weekCount,
} from "../../Utils/getTime";
import {
  ChartDataType,
  DashBoardDispatchType,
  DashBoardType,
  EDashBoards,
} from "../ActionTypes/DashBoardType";
import { DeviceType } from "../ActionTypes/DevicesActionTypes";
import { ProviderType } from "../ActionTypes/ProvidersActionTypes";
import { ServiceType } from "../ActionTypes/ServicesActionTypes";

export const dashboardGetAction =
  () => async (dispatch: Dispatch<DashBoardDispatchType>) => {
    try {
      dispatch({ type: EDashBoards.GET_LOADING });
      let data: DashBoardType = {
        devices: {
          summary: 0,
          active: 0,
          notActive: 0,
        },

        services: {
          summary: 0,
          active: 0,
          notActive: 0,
        },
        providers: {
          summary: 0,
          waiting: 0,
          used: 0,
          reject: 0,
        },
      };
      //query device
      const queryDevices = await getDocs(collection(db, "devices"));
      queryDevices.forEach((values) => {
        const temp = values.data() as DeviceType;
        data.devices.summary++;
        if (temp.isActive) {
          data.devices.active++;
        } else {
          data.devices.notActive++;
        }
      });
      //query service
      const queryService = await getDocs(collection(db, "services"));
      queryService.forEach((values) => {
        const temp = values.data() as ServiceType;
        data.services.summary++;
        if (temp.isActive) {
          data.services.active++;
        } else {
          data.devices.notActive++;
        }
      });
      //query provider
      const queryProvider = await getDocs(collection(db, "providers"));
      queryProvider.forEach((values) => {
        const temp = values.data() as ProviderType;
        data.providers.summary++;

        if (temp.status === 0) {
          data.providers.reject++;
        } else if (temp.status === 1) {
          data.providers.waiting++;
        } else if (temp.status === 2) {
          data.providers.used++;
        }
      });

      dispatch({
        type: EDashBoards.GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: EDashBoards.GET_ERROR, error: error as Error });
    }
  };

export const dashboardGetProviderChartDayAction =
  (date: { day: number; month: number; year: number }) =>
  async (dispatch: Dispatch<DashBoardDispatchType>) => {
    try {
      dispatch({ type: EDashBoards.GET_CHART_BY_DATE_LOADING });
      let providerChart: ChartDataType = {
        static: {
          summary: 0,
          waiting: 0,
          used: 0,
          reject: 0,
        },
        providerChart: [],
        annotationsPoint: {
          x: 0,
          y: 0,
        },
      };

      const providerRef = collection(db, "providers");
      const queryProvider = await getDocs(
        query(
          providerRef,
          where("dateProvider", "<", new Date(`2022-${date.month + 1}-01`)),
          where("dateProvider", ">=", new Date(`2022-${date.month}-01`))
        )
      );
      const provider: ProviderType[] = [];

      queryProvider.forEach((values) => {
        const temp = values.data() as ProviderType;
        provider.push(temp);

        providerChart.static.summary++;

        if (temp.status === 0) {
          providerChart.static.reject++;
        } else if (temp.status === 1) {
          providerChart.static.waiting++;
        } else if (temp.status === 2) {
          providerChart.static.used++;
        }
      });

      const chartData = getDaysInMonth(date.year, date.month).map((day) => {
        const sum = provider.filter((providerValue) => {
          if (
            moment(providerValue.dateProvider.toDate()).date() === day &&
            moment(providerValue.dateProvider.toDate()).year() === date.year
          ) {
            return true;
          }
          return false;
        }).length;

        return sum;
      });

      providerChart.annotationsPoint = {
        x: date.day,
        y: chartData[date.day - 1],
        value: chartData[date.day - 1],
      };

      providerChart.providerChart = chartData;

      dispatch({
        type: EDashBoards.GET_CHART_BY_DATE_SUCCESS,
        payload: providerChart,
      });
    } catch (error) {
      dispatch({
        type: EDashBoards.GET_CHART_BY_DATE_ERROR,
        error: error as Error,
      });
    }
  };

export const dashboardGetProviderChartMonthAction =
  (date: { month: number; year: number }) =>
  async (dispatch: Dispatch<DashBoardDispatchType>) => {
    try {
      dispatch({ type: EDashBoards.GET_CHART_BY_DATE_LOADING });
      let providerChart: ChartDataType = {
        static: {
          summary: 0,
          waiting: 0,
          used: 0,
          reject: 0,
        },
        providerChart: [],
        annotationsPoint: {
          x: 0,
          y: 0,
        },
      };

      const providerRef = collection(db, "providers");
      const queryProvider = await getDocs(
        query(
          providerRef,
          where("dateProvider", "<", new Date(`2022-${date.month + 1}-01`)),
          where("dateProvider", ">=", new Date(`2022-${date.month}-01`))
        )
      );

      queryProvider.forEach((values) => {
        const temp = values.data() as ProviderType;

        providerChart.static.summary++;

        if (temp.status === 0) {
          providerChart.static.reject++;
        } else if (temp.status === 1) {
          providerChart.static.waiting++;
        } else if (temp.status === 2) {
          providerChart.static.used++;
        }
      });

      const provider: ProviderType[] = [];

      const queryChart = await getDocs(providerRef);

      queryChart.forEach((values) => {
        const temp = values.data() as ProviderType;
        provider.push(temp);
      });

      const chartData = getMonthInYear.map((month) => {
        const sum = provider.filter((providerValue) => {
          if (
            moment(providerValue.dateProvider.toDate()).month() + 1 === month &&
            moment(providerValue.dateProvider.toDate()).year() === date.year
          ) {
            return true;
          }
          return false;
        }).length;

        return sum;
      });

      providerChart.annotationsPoint = {
        x: date.month,
        y: chartData[date.month - 1],
        value: chartData[date.month - 1],
      };
      providerChart.providerChart = chartData;

      dispatch({
        type: EDashBoards.GET_CHART_BY_DATE_SUCCESS,
        payload: providerChart,
      });
    } catch (error) {
      dispatch({
        type: EDashBoards.GET_CHART_BY_DATE_ERROR,
        error: error as Error,
      });
    }
  };

export const dashboardGetProviderChartWeekAction =
  (date: { day: number; month: number; year: number }) =>
  async (dispatch: Dispatch<DashBoardDispatchType>) => {
    try {
      dispatch({ type: EDashBoards.GET_CHART_BY_DATE_LOADING });
      let providerChart: ChartDataType = {
        static: {
          summary: 0,
          waiting: 0,
          used: 0,
          reject: 0,
        },
        providerChart: [],
        annotationsPoint: {
          x: 0,
          y: 0,
        },
      };

      const providerRef = collection(db, "providers");
      const queryProvider = await getDocs(
        query(
          providerRef,
          where("dateProvider", "<", new Date(`2022-${date.month + 1}-01`)),
          where("dateProvider", ">=", new Date(`2022-${date.month}-01`))
        )
      );
      const provider: ProviderType[] = [];

      queryProvider.forEach((values) => {
        const temp = values.data() as ProviderType;
        provider.push(temp);

        providerChart.static.summary++;

        if (temp.status === 0) {
          providerChart.static.reject++;
        } else if (temp.status === 1) {
          providerChart.static.waiting++;
        } else if (temp.status === 2) {
          providerChart.static.used++;
        }
      });

      const chartData = getWeekInMonth.map((week) => {
        const sum = provider.filter((providerValue) => {
          const providerDate = new Date(providerValue.dateProvider.toDate());
          if (
            weekCount(
              providerDate.getFullYear(),
              providerDate.getMonth() + 1,
              providerDate.getDate()
            ) === week &&
            providerDate.getFullYear() === date.year
          ) {
            return true;
          }
          return false;
        }).length;

        return sum;
      });
      console.log(weekCount(date.year, date.month, date.day));
      providerChart.annotationsPoint = {
        x: `Tuần ${weekCount(date.year, date.month, date.day)}`,
        y: chartData[weekCount(date.year, date.month, date.day) - 1],
        value: chartData[weekCount(date.year, date.month, date.day) - 1],
      };
      providerChart.providerChart = chartData;

      dispatch({
        type: EDashBoards.GET_CHART_BY_DATE_SUCCESS,
        payload: providerChart,
      });
    } catch (error) {
      dispatch({
        type: EDashBoards.GET_CHART_BY_DATE_ERROR,
        error: error as Error,
      });
    }
  };
