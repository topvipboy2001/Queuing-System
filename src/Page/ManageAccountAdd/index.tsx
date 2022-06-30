import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleGetAction } from "../../State/Actions/RoleActions";
import { userAddAction } from "../../State/Actions/UserActions";
import { UserAddType } from "../../State/ActionTypes/UserActionTypes";
import { RootStore } from "../../State/Store";
import ManageAccountAddLayout from "./Components/ManageAccountAddLayout";

const ManageAccountAdd = () => {
  const dispatch = useDispatch();
  const roleState = useSelector((state: RootStore) => state.role);
  const state = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        await dispatch(roleGetAction());
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoles();
  }, [dispatch]);

  const onFinish = async (values: UserAddType) => {
    try {
      const actionValue: UserAddType = {
        name: values.name,
        username: values.username,
        password: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: values.role,
        isActive: values.isActive,
      };

      await dispatch(userAddAction(actionValue));
      message.success("adding a role success!");
    } catch (error) {
      console.log(error);
      message.error("adding a role error!");
    }
  };

  return (
    <ManageAccountAddLayout
      roleLoading={roleState.loading}
      roleData={roleState.current}
      loading={state.loading}
      onFinish={onFinish}
    />
  );
};

export default ManageAccountAdd;
