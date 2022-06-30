import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import { ELogin, ILoginDispatchTypes } from "../ActionTypes/LoginActionTypes";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

export const LoginActions =
  (username: string, password: string) =>
  async (dispatch: Dispatch<ILoginDispatchTypes>) => {
    dispatch({
      type: ELogin.LOADING,
    });

    try {
      let user = undefined;

      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", "==", username),
        where("password", "==", password)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        user = doc.data();
        console.log(user);
        if (user.role) {
          const role = await getDoc(user.role);
          console.log(role.data());
        }
        localStorage.setItem("userId", doc.id);
      });

      if (!user) {
        dispatch({
          type: ELogin.FAIL,
          message: "Sai mật khẩu hoặc tên đăng nhập",
        });
        return;
      }

      dispatch({
        type: ELogin.SUCCESS,
        user: user,
      });
    } catch (error) {
      dispatch({
        type: ELogin.ERROR,
        error: error as Error,
      });
    }
  };

export const LogOutAction =
  () => async (dispatch: Dispatch<ILoginDispatchTypes>) => {
    dispatch({
      type: ELogin.LOGOUT,
    });
    localStorage.removeItem("userId");
  };
