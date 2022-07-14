import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
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
