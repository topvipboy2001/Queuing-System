import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleGetAction } from "../../State/Actions/RolesActions";
import { userAddAction } from "../../State/Actions/UsersActions";
import { UserAddType } from "../../State/ActionTypes/UsersActionTypes";
import { RootStore } from "../../State/Store";
import ManageAccountAddLayout from "./Components/ManageAccountAddLayout";

const ManageAccountAdd = () => {
  const dispatch = useDispatch();
  const roleState = useSelector((state: RootStore) => state.roles);
  const state = useSelector((state: RootStore) => state.users);

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
      message.success("Thêm tài khoản thành công!");
    } catch (error: any) {
      message.error(error);
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
