import { collection, getDoc, getDocs } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  EReports,
  IReportDispatchType,
  ReportsType,
} from "../ActionTypes/ReportsActionTypes";

export const reportsGetAction =
  () => async (dispatch: Dispatch<IReportDispatchType>) => {
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
