const toErrorMessage = (error: any) => {
  const errorCode = error.code;
  switch (errorCode) {
    case "auth/user-not-found":
      return "Sai mật khẩu hoặc tên đăng nhập";
    case "auth/invalid-password":
      return "Sai mật khẩu";

    //! need to change
    default:
      return "wrong errorCode from toErrorMessage.ts";
  }
};

export default toErrorMessage;
