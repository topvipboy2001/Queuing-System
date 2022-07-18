import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
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
  UserFilterType,
  UserType,
  UserUpdateType,
} from "../ActionTypes/UsersActionTypes";
import { db } from "../../Config/firebase";
import { RoleType } from "../ActionTypes/RolesActionType";
import Store from "../Store";
import { historyAddAction } from "./HistoryActions";

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
        newUsers.push({ ...value, role: { ...roleData, id: role.id } });
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

export const userGetByFilterAction =
  (filter: UserFilterType) => async (dispatch: Dispatch<UserDispatchType>) => {
    try {
      dispatch({
        type: EUser.GET_BY_FILTER_LOADING,
      });

      const { users } = Store.getState();
      const filterUsers: UserType[] = users.rootData.filter((value) => {
        if (filter.role !== null && value.role.id !== filter.role) {
          return false;
        }

        if (filter.search !== null && filter.search !== undefined) {
          return (
            value.username
              .toLowerCase()
              .includes(filter.search.toLowerCase()) ||
            value.name.toLowerCase().includes(filter.search.toLowerCase())
          );
        }

        return true;
      });

      dispatch({
        type: EUser.GET_BY_FILTER_SUCCESS,
        payload: filterUsers,
      });
    } catch (error) {
      dispatch({
        type: EUser.GET_BY_FILTER_ERROR,
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

      const userRef = doc(db, "users", newUser.id);

      const userSnap = await getDoc(userRef);
      const userData = userSnap.data() as UserType;
      const role = await getDoc(userData.role);
      const newUserData = {
        ...userData,
        role: { ...(role.data() as RoleType), id: role.id },
      };
      const roleRef = doc(db, "roles", role.id);

      await updateDoc(roleRef, {
        amountOfUser: increment(1),
      });

      await historyAddAction("Thêm tài khoản", "users", userRef.id);
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

      await historyAddAction(
        "Cập nhật thông tin tài khoản",
        "users",
        userUpdateRef.id
      );

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
