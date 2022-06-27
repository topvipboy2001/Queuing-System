import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../../Config/firebase";
import {
  EResetPassword,
  IConfirmEmailDispatchTypes,
} from "../ActionTypes/ResetPasswordActionTypes";
import { RootStore } from "../Store";

export const confirmEmailActions =
  (email: string) => async (dispatch: Dispatch<IConfirmEmailDispatchTypes>) => {
    dispatch({
      type: EResetPassword.CONFIRM_EMAIL_LOADING,
      loading: true,
    });

    try {
      let userId = undefined;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        userId = doc.id;
        console.log(userId);
      });

      if (!userId) {
        dispatch({
          type: EResetPassword.CONFIRM_EMAIL_FAIL,
          loading: false,
          message: "Email không tồn tại",
        });
        return;
      }

      dispatch({
        type: EResetPassword.CONFIRM_EMAIL_SUCCESS,
        userId: userId,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: EResetPassword.CONFIRM_EMAIL_ERROR,
        loading: false,
        error: error as Error,
      });
    }
  };

export const ResetPasswordActions =
  (password: string, confirmPassword: string) =>
  async (
    dispatch: Dispatch<IConfirmEmailDispatchTypes>,
    getState: () => RootStore
  ) => {
    dispatch({
      type: EResetPassword.CHANGE_PASSWORD_LOADING,
      loading: true,
    });

    if (password !== confirmPassword) {
      dispatch({
        type: EResetPassword.CHANGE_PASSWORD_FAIL,
        loading: false,
        message: "Mật khẩu và xác nhận mật khẩu không giống nhau",
      });
      return Promise.reject();
    }

    try {
      const userId = getState().resetPassword.userId;
      if (userId) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          password: password,
        });

        dispatch({
          type: EResetPassword.CHANGE_PASSWORD_SUCCESS,
          loading: false,
        });
      } else {
        dispatch({
          type: EResetPassword.CHANGE_PASSWORD_FAIL,
          loading: false,
          message: "Không tìm thấy userId",
        });
        return Promise.reject();
      }
    } catch (error) {
      dispatch({
        type: EResetPassword.CHANGE_PASSWORD_ERROR,
        loading: false,
        error: error as Error,
      });
      return Promise.reject();
    }
  };

export const clearResetPasswordCacheActions =
  () => (dispatch: Dispatch<IConfirmEmailDispatchTypes>) => {
    dispatch({
      type: EResetPassword.CLEAR_CACHE,
    });
  };
