import { collection, getDocs } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  ESourceProvider,
  SourceProviderDispatchType,
  SourceProviderType,
} from "../ActionTypes/SourceProvidesActionTypes";

export const sourceProviderGetAction =
  () => async (dispatch: Dispatch<SourceProviderDispatchType>) => {
    try {
      dispatch({
        type: ESourceProvider.GET_LOADING,
      });
      const sourceProvider: SourceProviderType[] = [];

      const sourceProviderQuery = await getDocs(
        collection(db, "sourceProvider")
      );
      sourceProviderQuery.forEach((value) => {
        const temp = value.data() as SourceProviderType;
        const id = value.id;
        sourceProvider.push({
          ...temp,
          id,
        });
      });

      sourceProvider.reverse();
      dispatch({
        type: ESourceProvider.GET_SUCCESS,
        payload: sourceProvider,
      });
    } catch (error) {
      dispatch({
        type: ESourceProvider.GET_ERROR,
        error: error as Error,
      });
    }
  };
