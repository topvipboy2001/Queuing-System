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
import {
  EUser,
  UserAddType,
  UserDispatchType,
  UserType,
  UserUpdateType,
} from "../ActionTypes/UsersActionTypes";
import { db } from "../../Config/firebase";
import { RoleType } from "../ActionTypes/RolesActionType";

export const userGetAction =
  () => async (dispatch: Dispatch<UserDispatchType>) => {
    try {
      dispatch({
        type: EUser.GET_LOADING,
      });

      const users: UserType[] = [];

      const queryRoles = await getDocs(collection(db, "users"));
      queryRoles.forEach(async (value) => {
        const temp = value.data() as UserType;
        const id = value.id;

        users.push({
          ...temp,
          id,
        });
      });

      let newUsers: UserType[] = [];

      for (const value of users) {
        const role = await getDoc(value.role);
        const roleData = (await role.data()) as RoleType;
        newUsers.push({ ...value, role: roleData });
      }

      newUsers.reverse();
      dispatch({
        type: EUser.GET_SUCCESS,
        payload: newUsers,
      });
    } catch (error) {
      dispatch({
        type: EUser.GET_ERROR,
        error: error as Error,
      });
    }
  };

export const userAddAction =
  (values: UserAddType) => async (dispatch: Dispatch<UserDispatchType>) => {
    try {
      dispatch({
        type: EUser.ADD_LOADING,
      });

      const isExistUserUsernameQ = query(
        collection(db, "users"),
        where("username", "==", values.username)
      );
      const isExistUserUsernameSnap = await getDocs(isExistUserUsernameQ);

      if (!isExistUserUsernameSnap.empty) {
        dispatch({
          type: EUser.ADD_ERROR,
          error: new Error("Tên đăng nhập đã tồn tại trong hệ thống"),
        });
        return Promise.reject("Tên đăng nhập đã tồn tại trong hệ thống");
      }

      const newUser = doc(collection(db, "users"));
      await setDoc(newUser, {
        ...values,
        role: doc(db, `/roles/${values.role}`),
      });

      const userRef = doc(db, "roles", newUser.id);

      const userSnap = await getDoc(userRef);
      const userData = userSnap.data() as UserType;
      const role = await getDoc(userData.role);
      const newUserData = {
        ...userData,
        role: { ...(role.data() as RoleType), id: role.id },
      };

      dispatch({
        type: EUser.ADD_SUCCESS,
        payload: { ...newUserData, id: userSnap.id } as UserType,
      });
    } catch (error) {
      dispatch({
        type: EUser.ADD_ERROR,
        error: error as Error,
      });
    }
  };

export const userGetByIdAction =
  (id: string) => async (dispatch: Dispatch<UserDispatchType>) => {
    try {
      dispatch({
        type: EUser.GET_BY_ID_LOADING,
      });

      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data() as UserType;
      const role = await getDoc(userData.role);
      const newUserData = {
        ...userData,
        role: { ...(role.data() as RoleType), id: role.id },
      };

      dispatch({
        type: EUser.GET_BY_ID_SUCCESS,
        payload: newUserData,
      });
    } catch (error) {
      dispatch({
        type: EUser.GET_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };

export const userUpdateByIdAction =
  (values: UserUpdateType, id: string) =>
  async (dispatch: Dispatch<UserDispatchType>) => {
    try {
      dispatch({
        type: EUser.UPDATE_BY_ID_LOADING,
      });
      const userRef = doc(db, "users", id);
      const userUpdate = { ...values, role: doc(db, `/roles/${values.role}`) };

      await updateDoc(userRef, userUpdate);

      const userUpdateRef = doc(db, "users", id);
      const userSnap = await getDoc(userUpdateRef);
      const userData = userSnap.data() as UserType;
      const role = await getDoc(userData.role);
      const newUserData = {
        ...userData,
        role: { ...(role.data() as RoleType), id: role.id },
      };
      dispatch({
        type: EUser.UPDATE_BY_ID_SUCCESS,
        payload: newUserData,
      });
    } catch (error) {
      dispatch({
        type: EUser.UPDATE_BY_ID_ERROR,
        error: error as Error,
      });
    }
  };
