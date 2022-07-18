import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  EServices,
  ServiceAddType,
  ServiceDispatchType,
  ServiceFilterType,
  ServiceType,
  ServiceUpdateType,
} from "../ActionTypes/ServicesActionTypes";
import Store from "../Store";
import { historyAddAction } from "./HistoryActions";

export const serviceGetAction =
  () => async (dispatch: Dispatch<ServiceDispatchType>) => {
    try {
      dispatch({
        type: EServices.GET_LOADING,
      });

      const services: ServiceType[] = [];
      const queryServices = await getDocs(collection(db, "services"));
      queryServices.forEach(async (values) => {
        const temp = values.data() as ServiceType;
        const serviceId = values.id;

        services.push({
          ...temp,
          id: serviceId,
        });
      });

      services.reverse();
      dispatch({
        type: EServices.GET_SUCCESS,
        payload: services,
      });
    } catch (error) {
      dispatch({
        type: EServices.GET_ERROR,
        error: error as Error,
      });
    }
  };

export const serviceGetByFilterAction =
  (filter: ServiceFilterType) =>
  async (dispatch: Dispatch<ServiceDispatchType>) => {
    try {
      dispatch({
        type: EServices.GET_BY_FILTER_LOADING,
      });

      const { services } = Store.getState();
      const filterServices: ServiceType[] = services.rootData.filter(
        (value) => {
          if (filter.isActive !== null && value.isActive !== filter.isActive) {
            return false;
          }

          if (filter.search !== null && filter.search !== undefined) {
            return (
              value.id.toLowerCase().includes(filter.search.toLowerCase()) ||
              value.name.toLowerCase().includes(filter.search.toLowerCase())
            );
          }

          return true;
        }
      );

      dispatch({
        type: EServices.GET_BY_FILTER_SUCCESS,
        payload: filterServices,
      });
    } catch (error) {
      dispatch({
        type: EServices.GET_BY_FILTER_ERROR,
        error: error as Error,
      });
    }
  };

export const serviceAddAction =
  (values: ServiceAddType) =>
  async (dispatch: Dispatch<ServiceDispatchType>) => {
    try {
      dispatch({
        type: EServices.ADD_LOADING,
      });

      const isExistServiceRef = doc(db, "services", values.id);
      const isExistServiceSnap = await getDoc(isExistServiceRef);
      if (isExistServiceSnap.exists()) {
        dispatch({
          type: EServices.ADD_ERROR,
          error: new Error("Mã dịch vụ đã tồn tại trong hệ thống"),
        });
        return Promise.reject("Mã dịch vụ đã tồn tại trong hệ thống");
      }

      const newService = doc(db, "services", values.id);
      const inputService = {
        name: values.name,
        prefix: values.prefix,
        surfix: values.surfix,
        description: values.description,
        increase: values.increase,
        isReset: values.isReset,
        isActive: true,
      };

      await setDoc(newService, inputService);

      const serviceRef = doc(db, "services", newService.id);
      const serviceSnap = await getDoc(serviceRef);

      await historyAddAction("Thêm dịch vụ với mã", "services", serviceRef.id);

      dispatch({
        type: EServices.ADD_SUCCESS,
        payload: { id: serviceSnap.id, ...serviceSnap.data() } as ServiceType,
      });
    } catch (error) {
      dispatch({
        type: EServices.ADD_ERROR,
        error: error as Error,
      });
    }
  };

export const serviceGetByIdAction =
  (id: string) => async (dispatch: Dispatch<ServiceDispatchType>) => {
    try {
      dispatch({
        type: EServices.GET_BY_ID_LOADING,
      });

      const queryServices = await getDoc(doc(db, "services", id));
      const service: ServiceType = {
        ...queryServices.data(),
        id: queryServices.id,
      } as ServiceType;

      dispatch({
        type: EServices.GET_BY_ID_SUCCESS,
        payload: service,
      });
    } catch (error) {
      dispatch({
        type: EServices.GET_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };

export const serviceUpdateByIdAction =
  (values: ServiceUpdateType) =>
  async (dispatch: Dispatch<ServiceDispatchType>) => {
    try {
      dispatch({
        type: EServices.UPDATE_BY_ID_LOADING,
      });

      const serviceRef = doc(db, "services", values.id);
      const serviceUpdate = {
        name: values.name,
        increase: values.increase,
        isReset: values.isReset,
        prefix: values.prefix,
        surfix: values.surfix,
        description: values.description,
      };
      await updateDoc(serviceRef, serviceUpdate);

      const update = await getDoc(serviceRef);
      const updateData = { ...update.data(), id: update.id } as ServiceType;
      await historyAddAction(
        "Cập nhật thông tin dịch vụ",
        "services",
        serviceRef.id
      );

      dispatch({
        type: EServices.UPDATE_BY_ID_SUCCESS,
        payload: updateData,
      });
    } catch (error) {
      dispatch({
        type: EServices.UPDATE_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };
