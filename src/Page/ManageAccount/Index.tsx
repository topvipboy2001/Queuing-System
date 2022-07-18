import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleGetAction } from "../../State/Actions/RolesActions";
import {
  userGetAction,
  userGetByFilterAction,
} from "../../State/Actions/UsersActions";
import { UserFilterType } from "../../State/ActionTypes/UsersActionTypes";
import { RootStore } from "../../State/Store";
import ManageAccountLayout from "./Components/ManageAccountLayout";

const ManageAccount = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.users);
  const roleState = useSelector((state: RootStore) => state.roles);
  const [form] = useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(userGetAction());
        await dispatch(roleGetAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  const onFinish = async (values: UserFilterType) => {
    try {
      await dispatch(userGetByFilterAction(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ManageAccountLayout
      loading={state.loading}
      data={state.current}
      rolesLoading={roleState.loading}
      rolesData={roleState.current}
      onFinish={onFinish}
      form={form}
    />
  );
};

export default ManageAccount;
