import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  EProviders,
  ProviderAddType,
  ProviderFilterGetServiceIDType,
  ProviderFilterType,
  ProvidersDispatchType,
  ProviderType,
} from "../ActionTypes/ProvidersActionTypes";
import { ServiceType } from "../ActionTypes/ServicesActionTypes";
import Store from "../Store";
import { historyAddAction } from "./HistoryActions";

export const providerGetAction =
  () => async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.GET_LOADING,
      });

      const providers: ProviderType[] = [];
      const queryProviders = await getDocs(
        query(collection(db, "providers"), orderBy("ordinalNumber"))
      );
      queryProviders.forEach(async (values) => {
        const temp = values.data() as ProviderType;
        const providerId = values.id;

        providers.push({
          ...temp,
          id: providerId,
        });
      });

      let newProvider: ProviderType[] = [];
      for (const values of providers) {
        const service = await getDoc(values.services);
        const sourceProvider = await getDoc(values.sourceProvider);
        newProvider.push({
          ...values,
          services: { ...(service.data() as ServiceType), id: service.id },
          sourceProvider: {
            ...(sourceProvider.data() as any),
            id: sourceProvider.id,
          },
        });
      }

      dispatch({
        type: EProviders.GET_SUCCESS,
        payload: newProvider,
      });
    } catch (error) {
      dispatch({
        type: EProviders.GET_ERROR,
        error: error as Error,
      });
    }
  };

export const providerGetForNotificationAction =
  () => async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.GET_NOTIFICATION_LOADING,
      });

      const providers: ProviderType[] = [];
      const queryProviders = await getDocs(
        query(collection(db, "providers"), orderBy("ordinalNumber"))
      );
      queryProviders.forEach(async (values) => {
        const temp = values.data() as ProviderType;
        const providerId = values.id;

        providers.push({
          ...temp,
          id: providerId,
        });
      });

      let newProvider: ProviderType[] = [];
      for (const values of providers) {
        const service = await getDoc(values.services);
        const sourceProvider = await getDoc(values.sourceProvider);
        newProvider.push({
          ...values,
          services: service.data(),
          sourceProvider: sourceProvider.data(),
        });
      }

      dispatch({
        type: EProviders.GET_NOTIFICATION_SUCCESS,
        notificationPayload: newProvider,
      });
    } catch (error) {
      dispatch({
        type: EProviders.GET_NOTIFICATION_ERROR,
        error: error as Error,
      });
    }
  };

export const providerGetByFilterAction =
  (filter: ProviderFilterType) =>
  async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.GET_BY_FILTER_LOADING,
      });

      const { providers } = Store.getState();

      const filterProviders: ProviderType[] = providers.rootData.filter(
        (value) => {
          if (filter.service !== null && value.services.id !== filter.service) {
            return false;
          }

          if (filter.status !== null && value.status !== filter.status) {
            return false;
          }

          if (
            filter.sourceProvider !== null &&
            value.sourceProvider.id !== filter.sourceProvider
          ) {
            return false;
          }
          if (filter.dateRange) {
            const dateProvider = moment(value.dateProvider.toDate());
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
          if (filter.search !== null && filter.search !== undefined) {
            return (
              value.services.name
                .toLowerCase()
                .includes(filter.search.toLowerCase()) ||
              value.customerName
                .toLowerCase()
                .includes(filter.search.toLowerCase())
            );
          }

          return true;
        }
      );

      dispatch({
        type: EProviders.GET_BY_FILTER_SUCCESS,
        payload: filterProviders.sort(
          (a, b) => a.ordinalNumber - b.ordinalNumber
        ),
      });
    } catch (error) {
      dispatch({
        type: EProviders.GET_BY_FILTER_ERROR,
        error: error as Error,
      });
    }
  };

export const providerGetByServiceIdAction =
  (serviceId: string) => async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.GET_BY_SERVICE_ID_LOADING,
      });

      const serviceRef = doc(db, `/services/${serviceId}`);

      const providers: ProviderType[] = [];
      const queryProviders = await getDocs(
        query(collection(db, "providers"), where("services", "==", serviceRef))
      );
      queryProviders.forEach(async (values) => {
        const temp = values.data() as ProviderType;
        const providerId = values.id;

        providers.push({
          ...temp,
          id: providerId,
        });
      });

      let newProvider: ProviderType[] = [];
      for (const values of providers) {
        const service = await getDoc(values.services);
        const sourceProvider = await getDoc(values.sourceProvider);
        newProvider.push({
          ...values,
          services: service.data(),
          sourceProvider: sourceProvider.data(),
        });
      }

      dispatch({
        type: EProviders.GET_BY_SERVICE_ID_SUCCESS,
        subPayload: newProvider.sort(
          (a, b) => a.ordinalNumber - b.ordinalNumber
        ),
      });
    } catch (error) {
      dispatch({
        type: EProviders.GET_BY_SERVICE_ID_ERROR,
        error: error as Error,
      });
    }
  };

export const providerGetByServiceIdWithFilterAction =
  (filter: ProviderFilterGetServiceIDType) =>
  async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.GET_BY_SERVICE_ID_WITH_FILTER_LOADING,
      });

      const { providers } = Store.getState();
      const filterProviders: ProviderType[] = providers.rootData.filter(
        (value) => {
          console.log(filter.status);
          console.log(value.status);
          if (filter.status !== null && filter.status !== value.status) {
            return false;
          }

          if (filter.dateRange) {
            const dateProvider = moment(value.dateProvider.toDate());
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
        }
      );

      dispatch({
        type: EProviders.GET_BY_SERVICE_ID_WITH_FILTER_SUCCESS,
        subPayload: filterProviders.sort(
          (a, b) => a.ordinalNumber - b.ordinalNumber
        ),
      });
    } catch (error) {
      dispatch({
        type: EProviders.GET_BY_SERVICE_ID_WITH_FILTER_ERROR,
        error: error as Error,
      });
    }
  };

export const providerGetByIdAction =
  (id: string) => async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.GET_BY_ID_LOADING,
      });

      const providerRef = doc(db, "providers", id);
      const providerSnap = await getDoc(providerRef);
      const providerData = providerSnap.data() as ProviderType;
      const service = await getDoc(providerData.services);
      const sourceProvider = await getDoc(providerData.sourceProvider);
      const newProvider = {
        ...providerData,
        services: { ...(service.data() as ServiceType), id: service.id },
        sourceProvider: {
          ...(sourceProvider.data() as any),
          id: sourceProvider.id,
        },
      };

      dispatch({
        type: EProviders.GET_BY_ID_SUCCESS,
        payload: newProvider,
      });
    } catch (error) {
      dispatch({
        type: EProviders.GET_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };

export const providerAddAction =
  (values: ProviderAddType) =>
  async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.ADD_LOADING,
      });
      const today = moment().toDate();
      const nextFiveDay = moment(today).add(5, "days").toDate();
      let largestNumber = 0;

      const providerRef = collection(db, "providers");
      const largestOrdinalNumberQuery = query(
        providerRef,
        orderBy("ordinalNumber", "desc"),
        limit(1)
      );
      const largestOrdinalNumberSnapshot = await getDocs(
        largestOrdinalNumberQuery
      );
      largestOrdinalNumberSnapshot.forEach((doc) => {
        largestNumber = doc.data().ordinalNumber;
      });

      const newProvider = doc(providerRef);
      await setDoc(newProvider, {
        customerName: values.customerName,
        dateProvider: today,
        dateValid: nextFiveDay,
        email: values.email,
        phoneNumber: values.phoneNumber,
        ordinalNumber: largestNumber + 1,
        services: doc(db, `/services/${values.service}`),
        status: 1,
        sourceProvider: doc(db, `/sourceProvider/piNFEgGpGaiJ4Ki5T6GQ`),
      });

      const newProviderRef = doc(db, "providers", newProvider.id);
      const newProviderSnap = await getDoc(newProviderRef);
      const newProviderData = newProviderSnap.data() as ProviderType;
      const services = await getDoc(newProviderData.services);
      const sourceProvider = await getDoc(newProviderData.sourceProvider);
      const data = {
        ...newProviderData,
        services: { ...(services.data() as ServiceType), id: services.id },
        sourceProvider: {
          ...(sourceProvider.data() as any),
          id: sourceProvider.id,
        },
      };

      await historyAddAction("Cấp số với mã", "providers", newProviderRef.id);
      dispatch({
        type: EProviders.ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EProviders.ADD_ERROR,
        error: error as Error,
      });
    }
  };
