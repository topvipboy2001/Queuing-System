import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "react";
import {
  DeviceTypeDispatchType,
  DeviceTypeType,
  EDeviceType,
} from "../ActionTypes/DeviceTypesActionTypes";
import { db } from "../../Config/firebase";

export const deviceTypeGetAction =
  () => async (dispatch: Dispatch<DeviceTypeDispatchType>) => {
    try {
      dispatch({
        type: EDeviceType.GET_LOADING,
      });

      const deviceTypes: DeviceTypeType[] = [];
      const queryDeviceType = await getDocs(collection(db, "deviceType"));
      queryDeviceType.forEach((value) => {
        const temp = value.data() as DeviceTypeType;
        const id = value.id;
        deviceTypes.push({
          ...temp,
          id,
        });
      });

      deviceTypes.reverse();
      dispatch({
        type: EDeviceType.GET_SUCCESS,
        payload: deviceTypes,
      });
    } catch (error) {
      dispatch({
        type: EDeviceType.GET_ERROR,
        error: error as Error,
      });
    }
  };
