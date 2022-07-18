import { collection, getDoc, getDocs } from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  EReports,
  ReportDispatchType,
  ReportFilterType,
  ReportsType,
} from "../ActionTypes/ReportsActionTypes";
import Store from "../Store";

export const reportsGetAction =
  () => async (dispatch: Dispatch<ReportDispatchType>) => {
    try {
      dispatch({
        type: EReports.GET_LOADING,
      });

      const reports: ReportsType[] = [];
      const queryReports = await getDocs(collection(db, "providers"));
      queryReports.forEach(async (values) => {
        const temp = values.data() as ReportsType;
        const reportId = values.id;

        reports.push({
          ...temp,
          id: reportId,
        });
      });

      let newReports: ReportsType[] = [];
      for (const values of reports) {
        const service = await getDoc(values.services);
        const sourceProvider = await getDoc(values.sourceProvider);
        newReports.push({
          ...values,
          services: service.data(),
          sourceProvider: sourceProvider.data(),
        });
      }

      newReports.reverse();

      dispatch({
        type: EReports.GET_SUCCESS,
        payload: newReports,
      });
    } catch (error) {
      dispatch({
        type: EReports.GET_ERROR,
        error: error as Error,
      });
    }
  };

export const reportsGetByFilterAction =
  (filter: ReportFilterType) =>
  async (dispatch: Dispatch<ReportDispatchType>) => {
    if (filter.dateRange === null) return;

    try {
      dispatch({
        type: EReports.GET_WITH_FILTER_LOADING,
      });

      const { reports } = Store.getState();

      let newReports: ReportsType[] = reports.rootData.filter((value) => {
        const dateProvider = moment(value.dateProvider.toDate());
        if (filter.dateRange) {
          if (
            filter.dateRange[0] &&
            !moment(filter.dateRange[0]).isSameOrBefore(dateProvider, "days")
          ) {
            return false;
          }

          if (
            filter.dateRange[1] &&
            !moment(filter.dateRange[1]).isSameOrAfter(dateProvider, "days")
          ) {
            return false;
          }
        }
        return true;
      });

      newReports.reverse();

      dispatch({
        type: EReports.GET_WITH_FILTER_SUCCESS,
        payload: newReports.sort((a, b) => a.ordinalNumber - b.ordinalNumber),
      });
    } catch (error) {
      dispatch({
        type: EReports.GET_WITH_FILTER_ERROR,
        error: error as Error,
      });
    }
  };
