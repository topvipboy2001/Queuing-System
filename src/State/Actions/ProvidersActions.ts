import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
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
      const queryProviders = await getDocs(collection(db, "providers"));
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

      newProvider.reverse();
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
