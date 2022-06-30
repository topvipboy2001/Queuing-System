import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import ResetPasswordReducer from "./ResetPasswordReducers";
import RoleReducer from "./RoleReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  resetPassword: ResetPasswordReducer,
  role: RoleReducer,
  user: UserReducer,
});

export default RootReducer;
