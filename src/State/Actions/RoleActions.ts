import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  ERole,
  RoleAddType,
  RoleDispatchType,
  RoleType,
} from "../ActionTypes/RoleActionType";

export const roleAddAction =
  (values: RoleAddType) => async (dispatch: Dispatch<RoleDispatchType>) => {
    try {
      dispatch({
        type: ERole.ADD_LOADING,
      });
      const newRole = doc(collection(db, "roles"));
      await setDoc(newRole, { ...values, amountOfUser: 6 });

      const roleRef = doc(db, "roles", newRole.id);
      const roleSnap = await getDoc(roleRef);
      if (roleSnap.exists()) {
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
