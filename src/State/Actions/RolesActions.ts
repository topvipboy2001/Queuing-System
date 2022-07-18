import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  ERole,
  RoleAddType,
  RoleDispatchType,
  RoleFilterType,
  RoleType,
} from "../ActionTypes/RolesActionType";
import Store from "../Store";
import { historyAddAction } from "./HistoryActions";

export const roleAddAction =
  (values: RoleAddType) => async (dispatch: Dispatch<RoleDispatchType>) => {
    try {
      dispatch({
        type: ERole.ADD_LOADING,
      });
      const newRole = doc(collection(db, "roles"));
      await setDoc(newRole, { ...values, amountOfUser: 0 });

      const roleRef = doc(db, "roles", newRole.id);
      const roleSnap = await getDoc(roleRef);
      if (roleSnap.exists()) {
        historyAddAction("Thêm vai trò", "roles", roleRef.id);
        dispatch({
          type: ERole.ADD_SUCCESS,
          payload: { id: roleSnap.id, ...roleSnap.data() } as RoleType,
        });
      }
      Promise.reject("adding was not success!");
    } catch (error) {
      dispatch({
        type: ERole.ADD_ERROR,
        error: error as Error,
      });
    }
  };

export const roleGetAction =
  () => async (dispatch: Dispatch<RoleDispatchType>) => {
    try {
      dispatch({
        type: ERole.GET_LOADING,
      });

      const roles: RoleType[] = [];

      const queryRoles = await getDocs(collection(db, "roles"));
      queryRoles.forEach((value) => {
        const temp = value.data() as RoleType;
        const id = value.id;
        roles.push({
          id,
          name: temp.name,
          description: temp.description,
          authority: temp.authority,
          amountOfUser: temp.amountOfUser,
        });
      });

      roles.reverse();
      dispatch({
        type: ERole.GET_SUCCESS,
        payload: roles,
      });
    } catch (error) {
      dispatch({
        type: ERole.GET_ERROR,
        error: error as Error,
      });
    }
  };

export const roleGetByIdAction =
  (id: string) => async (dispatch: Dispatch<RoleDispatchType>) => {
    try {
      dispatch({
        type: ERole.GET_BY_ID_LOADING,
      });
      const queryRole = await getDoc(doc(db, "roles", id));
      const role: RoleType = {
        ...(queryRole.data() as RoleType),
        id: queryRole.id,
      };

      dispatch({
        type: ERole.GET_BY_ID_SUCCESS,
        payload: role,
      });
    } catch (error) {
      dispatch({
        type: ERole.GET_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };

export const roleUpdateByIdAction =
  (id: string, values: RoleAddType) =>
  async (dispatch: Dispatch<RoleDispatchType>) => {
    try {
      dispatch({
        type: ERole.UPDATE_BY_ID_LOADING,
      });
      const roleRef = doc(db, "roles", id);
      await updateDoc(roleRef, values);

      const queryRole = await getDoc(roleRef);
      const role: RoleType = {
        ...(queryRole.data() as RoleType),
        id: queryRole.id,
      };

      dispatch({
        type: ERole.UPDATE_BY_ID_SUCCESS,
        payload: role,
      });
    } catch (error) {
      dispatch({
        type: ERole.UPDATE_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };

export const roleGetByFilterAction =
  (filter: RoleFilterType) => async (dispatch: Dispatch<RoleDispatchType>) => {
    try {
      dispatch({
        type: ERole.GET_BY_FILTER_LOADING,
      });

      const { roles } = Store.getState();
      const filterRoles: RoleType[] = roles.rootData.filter((value) => {
        if (filter.search !== null && filter.search !== undefined) {
          return value.name.toLowerCase().includes(filter.search.toLowerCase());
        }

        return true;
      });

      dispatch({
        type: ERole.GET_BY_FILTER_SUCCESS,
        payload: filterRoles,
      });
    } catch (error) {
      dispatch({
        type: ERole.GET_BY_FILTER_ERROR,
        error: error as Error,
      });
    }
  };
