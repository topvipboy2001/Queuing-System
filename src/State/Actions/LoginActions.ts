import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import { ELogin, LoginDispatchTypes } from "../ActionTypes/LoginActionTypes";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { UserType } from "../ActionTypes/UsersActionTypes";
import { RoleType } from "../ActionTypes/RolesActionType";

export const LoginActions =
  (username: string, password: string) =>
  async (dispatch: Dispatch<LoginDispatchTypes>) => {
    dispatch({
      type: ELogin.LOADING,
    });

    try {
      let user: UserType | undefined;

      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", "==", username),
        where("password", "==", password)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        user = doc.data() as UserType;

        localStorage.setItem("userId", doc.id);
        localStorage.setItem("name", user.name);
      });

      if (!user) {
        dispatch({
          type: ELogin.FAIL,
          message: "Sai mật khẩu hoặc tên đăng nhập",
        });
        return;
      }

      const role = await getDoc(user.role);
      user = { ...user, role: { ...(role.data() as RoleType), id: role.id } };

      dispatch({
        type: ELogin.SUCCESS,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: ELogin.ERROR,
        error: error as Error,
      });
    }
  };

export const LoginByIdAction =
  (id: string) => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    try {
      dispatch({ type: ELogin.LOGIN_BY_ID_LOADING });
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      const role = await getDoc((userSnap.data() as UserType).role);
      const userData = {
        ...(userSnap.data() as UserType),
        id: userSnap.id,
        role: { ...(role.data() as RoleType), id: role.id },
      };

      dispatch({
        type: ELogin.LOGIN_BY_ID_SUCCESS,
        payload: userData,
      });
    } catch (error) {
      dispatch({ type: ELogin.LOGIN_BY_ID_ERROR, error: error as Error });
    }
  };

export const LogOutAction =
  () => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    dispatch({
      type: ELogin.LOGOUT,
    });
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
  };
