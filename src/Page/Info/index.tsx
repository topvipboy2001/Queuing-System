import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginByIdAction } from "../../State/Actions/LoginActions";
import { RootStore } from "../../State/Store";
import ViewInfo from "./Components/ViewInfo";

const Info = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.login);
  const [form] = useForm();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          await dispatch(LoginByIdAction(userId));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInfo();
  }, [dispatch]);

  useEffect(() => {
    console.log(state.current.role.name);
    form.setFieldsValue({
      name: state.current.name,
      username: state.current.username,
      phoneNumber: state.current.phoneNumber,
      password: state.current.password,
      email: state.current.email,
      role: state.current.role.name,
    });

    // eslint-disable-next-line
  }, [state.current]);

  return (
    <div style={{ padding: "80px 104px 0 24px" }}>
      <ViewInfo data={state.current} loading={state.loading} form={form} />
    </div>
  );
};

export default Info;
