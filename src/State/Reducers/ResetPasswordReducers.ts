import {
  EResetPassword,
  ConfirmEmailDispatchTypes,
} from "../ActionTypes/ResetPasswordActionTypes";

export interface defaultState {
  loading: boolean;
  step: number;
  userId?: string;
  message?: string;
  error?: Error;
}

const initialState: defaultState = {
  loading: false,
  step: 1,
};

const ResetPasswordReducer = (
  state: defaultState = initialState,
  action: ConfirmEmailDispatchTypes
): defaultState => {
  switch (action.type) {
    case EResetPassword.CONFIRM_EMAIL_SUCCESS:
      return {
        userId: action.userId,
        loading: false,
        step: 2,
      };

    case EResetPassword.CONFIRM_EMAIL_LOADING:
      return {
        loading: true,
        step: 1,
      };

    case EResetPassword.CONFIRM_EMAIL_FAIL:
      return {
        loading: false,
        step: 1,
        message: action.message,
      };

    case EResetPassword.CONFIRM_EMAIL_ERROR:
      return {
        loading: false,
        step: 1,
        error: action.error,
      };

    case EResetPassword.CHANGE_PASSWORD_LOADING:
      return {
        loading: true,
        step: 2,
        userId: state.userId,
      };

    case EResetPassword.CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
        step: 3,
        userId: state.userId,
      };

    case EResetPassword.CHANGE_PASSWORD_FAIL:
      return {
        loading: false,
        step: 2,
        userId: state.userId,
        message: action.message,
      };

    case EResetPassword.CHANGE_PASSWORD_ERROR:
      return {
        loading: false,
        step: 2,
        userId: state.userId,
        error: action.error,
      };

    case EResetPassword.CLEAR_CACHE:
      return {
        loading: false,
        step: 1,
      };

    default:
      return state;
  }
};

export default ResetPasswordReducer;
