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
import { randomCustomer } from "../../Utils/randomCustomer";
import {
  EProviders,
  ProvidersDispatchType,
  ProviderType,
} from "../ActionTypes/ProvidersActionTypes";
import { ServiceType } from "../ActionTypes/ServicesActionTypes";

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
          services: service.data(),
          sourceProvider: sourceProvider.data(),
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

export const providerGetByServiceIdAction =
  (serviceId: string) => async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.GET_BY_SERVICE_ID_LOADING,
      });

      const serviceRef = doc(db, `/services/${serviceId}`);
      const serviceData = await getDoc(serviceRef);
      console.log(serviceData.data());

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
  (service: string) => async (dispatch: Dispatch<ProvidersDispatchType>) => {
    try {
      dispatch({
        type: EProviders.ADD_LOADING,
      });
      const today = moment().toDate();
      const nextFiveDay = moment(today).add(5, "days").toDate();
      const ranCustomer = randomCustomer();
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
        customerName: ranCustomer.name,
        dateProvider: today,
        dateValid: nextFiveDay,
        email: ranCustomer.email,
        phoneNumber: ranCustomer.phoneNumber,
        ordinalNumber: largestNumber + 1,
        services: doc(db, `/services/${service}`),
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
