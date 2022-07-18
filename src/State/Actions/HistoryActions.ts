import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import moment from "moment";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  EHistory,
  HistoryDispatchType,
  HistoryFilterType,
  HistoryType,
} from "../ActionTypes/HistoryActionTypes";
import Store from "../Store";

export const historyGetAction =
  () => async (dispatch: Dispatch<HistoryDispatchType>) => {
    try {
      dispatch({
        type: EHistory.GET_LOADING,
      });

      const history: HistoryType[] = [];
      const queryHistory = await getDocs(
        query(collection(db, "history"), orderBy("timeInteract", "desc"))
      );
      queryHistory.forEach((value) => {
        const temp = value.data() as HistoryType;
        history.push({
          ...temp,
          id: value.id,
        });
      });

      const newHistory: HistoryType[] = [];

      for (const iterator of history) {
        const user = await getDoc(iterator.user);
        const documentInteracted = await getDoc(iterator.documentInteracted);

        newHistory.push({
          ...iterator,
          user: { ...(user.data() as any), id: user.id },
          documentInteracted: {
            ...(documentInteracted.data() as any),
            id: documentInteracted.id,
          },
        });
      }

      dispatch({
        type: EHistory.GET_SUCCESS,
        payload: newHistory,
      });
    } catch (error) {
      dispatch({
        type: EHistory.GET_ERROR,
        error: error as Error,
      });
    }
  };

export const historyGetWithFilterAction =
  (filter: HistoryFilterType) =>
  async (dispatch: Dispatch<HistoryDispatchType>) => {
    try {
      dispatch({
        type: EHistory.GET_WITH_FILTER_LOADING,
      });
      const { history } = Store.getState();
      const filterHistory: HistoryType[] = history.rootData.filter((value) => {
        const timeInteracted = moment(value.timeInteract.toDate());
        if (filter.dateRange) {
          if (
            filter.dateRange[0] &&
            !moment(filter.dateRange[0]).isSameOrBefore(timeInteracted, "days")
          ) {
            return false;
          }

          if (
            filter.dateRange[1] &&
            !moment(filter.dateRange[1]).isSameOrAfter(timeInteracted, "days")
          ) {
            return false;
          }

          if (filter.search !== null && filter.search !== undefined) {
            return value.user.username
              .toLowerCase()
              .includes(filter.search.toLowerCase());
          }
        }
        return true;
      });

      dispatch({
        type: EHistory.GET_WITH_FILTER_SUCCESS,
        payload: filterHistory,
      });
    } catch (error) {
      dispatch({
        type: EHistory.GET_WITH_FILTER_ERROR,
        error: error as Error,
      });
    }
  };

export const historyAddAction = async (
  content: string,
  collectionInteracted: string,
  documentIdInteracted: string
) => {
  try {
    const userId = localStorage.getItem("userId");
    const inputHistory = {
      IPAddress: "192.168.3.1",
      content: content,
      documentInteracted: doc(
        db,
        `/${collectionInteracted}/${documentIdInteracted}`
      ),
      user: doc(db, `/users/${userId}`),
      timeInteract: new Date(),
    };

    await setDoc(doc(collection(db, "history")), inputHistory);
  } catch (error) {
    console.log(error);
  }
};
