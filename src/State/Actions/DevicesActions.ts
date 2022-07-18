import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  DeviceAddType,
  DeviceFilterType,
  DevicesDispatchType,
  DeviceType,
  DeviceUpdateType,
  EDevices,
} from "../ActionTypes/DevicesActionTypes";
import { ServiceType } from "../ActionTypes/ServicesActionTypes";
import Store from "../Store";
import { historyAddAction } from "./HistoryActions";

export const deviceAddAction =
  (values: DeviceAddType) =>
  async (dispatch: Dispatch<DevicesDispatchType>) => {
    try {
      dispatch({
        type: EDevices.ADD_LOADING,
      });

      const isExistDevicesIdRef = doc(db, "devices", values.id);
      const isExistDevicesIdSnap = await getDoc(isExistDevicesIdRef);
      if (isExistDevicesIdSnap.exists()) {
        dispatch({
          type: EDevices.ADD_ERROR,
          error: new Error("Mã thiết bị đã tồn tại trong hệ thống"),
        });
        return Promise.reject("Mã thiết bị đã tồn tại trong hệ thống");
      }

      const isExistDevicesUsernameQ = query(
        collection(db, "devices"),
        where("username", "==", values.username)
      );
      const isExistDevicesUsernameSnap = await getDocs(isExistDevicesUsernameQ);

      isExistDevicesUsernameSnap.forEach((value) => {
        console.log(value.data());
      });

      if (!isExistDevicesUsernameSnap.empty) {
        dispatch({
          type: EDevices.ADD_ERROR,
          error: new Error("Tên đăng nhập đã tồn tại trong hệ thống"),
        });
        return Promise.reject("Tên đăng nhập đã tồn tại trong hệ thống");
      }

      const newDevice = doc(db, "devices", values.id);
      const inputDevice = {
        name: values.name,
        deviceType: doc(db, `/deviceType/${values.deviceType}`),
        username: values.username,
        IPAddress: values.IPAddress,
        password: values.password,
        services: values.services.map((value) => {
          return doc(db, `/services/${value}`);
        }),
        isConnect: true,
        isActive: true,
      };
      await setDoc(newDevice, inputDevice);

      const deviceRef = doc(db, "devices", newDevice.id);
      const deviceSnap = await getDoc(deviceRef);

      await historyAddAction("Thêm thiết bị với mã", "devices", deviceRef.id);

      dispatch({
        type: EDevices.ADD_SUCCESS,
        payload: { id: deviceSnap.id, ...deviceSnap.data() } as DeviceType,
      });
    } catch (error) {
      dispatch({
        type: EDevices.ADD_ERROR,
        error: error as Error,
      });
    }
  };

export const deviceGetAction =
  () => async (dispatch: Dispatch<DevicesDispatchType>) => {
    try {
      dispatch({
        type: EDevices.GET_LOADING,
      });
      const devices: DeviceType[] = [];
      const queryDevices = await getDocs(collection(db, "devices"));
      queryDevices.forEach(async (value) => {
        const temp = value.data() as DeviceType;

        devices.push({
          ...temp,
          id: value.id,
        });
      });

      let newDevice: DeviceType[] = [];

      for (const index in devices) {
        const deviceType = await getDoc(devices[index].deviceType);
        let services = [];
        for (const key in devices[index].services) {
          const service = await getDoc(devices[index].services[key]);
          services.push(service.data());
        }

        newDevice.push({
          ...devices[index],
          deviceType: deviceType.data(),
          services,
        });
      }

      newDevice.reverse();

      dispatch({
        type: EDevices.GET_SUCCESS,
        payload: newDevice,
      });
    } catch (error) {
      dispatch({
        type: EDevices.GET_ERROR,
        error: error as Error,
      });
    }
  };

export const deviceGetByFilterAction =
  (filter: DeviceFilterType) =>
  async (dispatch: Dispatch<DevicesDispatchType>) => {
    try {
      dispatch({
        type: EDevices.GET_BY_FILTER_LOADING,
      });

      const { devices } = Store.getState();
      const filterDevices: DeviceType[] = devices.rootData.filter((value) => {
        if (filter.isActive !== null && value.isActive !== filter.isActive) {
          return false;
        }

        if (filter.isConnect !== null && value.isConnect !== filter.isConnect) {
          return false;
        }

        if (filter.search !== null && filter.search !== undefined) {
          return (
            value.id.toLowerCase().includes(filter.search.toLowerCase()) ||
            value.name.toLowerCase().includes(filter.search.toLowerCase())
          );
        }

        return true;
      });

      dispatch({
        type: EDevices.GET_BY_FILTER_SUCCESS,
        payload: filterDevices,
      });
    } catch (error) {
      dispatch({
        type: EDevices.GET_BY_FILTER_ERROR,
        error: error as Error,
      });
    }
  };

export const deviceGetByIdAction =
  (id: string) => async (dispatch: Dispatch<DevicesDispatchType>) => {
    try {
      dispatch({
        type: EDevices.GET_BY_ID_LOADING,
      });
      const deviceRef = doc(db, "devices", id);
      const deviceSnap = await getDoc(deviceRef);
      const deviceData = {
        ...deviceSnap.data(),
        id: deviceSnap.id,
      } as DeviceType;

      let deviceFormat: DeviceType;
      let services = [];
      const deviceType = await getDoc(deviceData.deviceType);
      for (const value of deviceData.services) {
        const service = await getDoc(value);
        services.push({ ...(service.data() as ServiceType), id: service.id });
      }

      deviceFormat = {
        ...deviceData,
        deviceType: { ...(deviceType.data() as DeviceType), id: deviceType.id },
        services,
      };

      dispatch({
        type: EDevices.GET_BY_ID_SUCCESS,
        payload: deviceFormat,
      });
    } catch (error) {
      dispatch({
        type: EDevices.GET_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };

export const deviceUpdateByIdAction =
  (values: DeviceUpdateType) =>
  async (dispatch: Dispatch<DevicesDispatchType>) => {
    try {
      dispatch({
        type: EDevices.UPDATE_BY_ID_LOADING,
      });

      const isExistDevicesUsernameQ = query(
        collection(db, "devices"),
        where("username", "==", values.username)
      );
      const isExistDevicesUsernameSnap = await getDocs(isExistDevicesUsernameQ);

      if (isExistDevicesUsernameSnap.empty) {
        dispatch({
          type: EDevices.ADD_ERROR,
          error: new Error("Tên đăng nhập đã tồn tại trong hệ thống"),
        });
        return Promise.reject("Tên đăng nhập đã tồn tại trong hệ thống");
      }

      const deviceRef = doc(db, "devices", values.id);
      const deviceUpdate = {
        name: values.name,
        deviceType: doc(db, `/deviceType/${values.deviceType}`),
        username: values.username,
        IPAddress: values.IPAddress,
        password: values.password,
        services: values.services.map((value) => {
          return doc(db, `/services/${value}`);
        }),
      };
      await updateDoc(deviceRef, deviceUpdate);

      const update = await getDoc(deviceRef);
      const updateData = { ...update.data(), id: update.id } as DeviceType;

      await historyAddAction(
        "Cập nhật thông tin thiết bị",
        "devices",
        deviceRef.id
      );

      dispatch({
        type: EDevices.UPDATE_BY_ID_SUCCESS,
        payload: updateData,
      });
    } catch (error) {
      dispatch({
        type: EDevices.UPDATE_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };
