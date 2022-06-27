import React, { useEffect } from "react";
import AuthWrapper from "../Components/AuthWrapper";
import illustrationHelp from "../../../Assets/illustrationHelp.svg";
import ConfirmEmail from "./ConfirmEmail";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../State/Store";
import ResetPassword from "./ResetPassword";
import {
  clearResetPasswordCacheActions,
  confirmEmailActions,
  ResetPasswordActions,
} from "../../../State/Actions/ResetPasswordActions";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export type valuesSubmitConfirmEmailType = {
  email: string;
};

export type valuesSubmitResetPasswordType = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const state = useSelector((state: RootStore) => state.resetPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearResetPasswordCacheActions());
  }, [dispatch]);

  const onFinishConfirrmEmail = async (
    values: valuesSubmitConfirmEmailType
  ) => {
    try {
      await dispatch(confirmEmailActions(values.email));
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishResetPassword = async (
    values: valuesSubmitResetPasswordType
  ) => {
    try {
      await dispatch(
        ResetPasswordActions(values.password, values.confirmPassword)
      );
      dispatch(clearResetPasswordCacheActions());
      navigate("/auth");
      message.success("Thay đổi Mật khẩu thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthWrapper
      illustration={illustrationHelp}
      form={
        state.step === 2 ? (
          <ResetPassword
            loading={state.loading}
            onFinish={onFinishResetPassword}
            message={state.message}
          />
        ) : (
          <ConfirmEmail
            loading={state.loading}
            onFinish={onFinishConfirrmEmail}
            message={state.message}
          />
        )
      }
    />
  );
};

export default ChangePassword;
