import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  roleGetAction,
  roleGetByFilterAction,
} from "../../State/Actions/RolesActions";
import { RoleFilterType } from "../../State/ActionTypes/RolesActionType";
import { RootStore } from "../../State/Store";
import ManageRoleLayout from "./Components/ManageRoleLayout";

const ManageRole = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.roles);
  const [form] = useForm();

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

  const onFinish = async (values: RoleFilterType) => {
    try {
      await dispatch(roleGetByFilterAction(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ManageRoleLayout
      loading={state.loading}
      data={state.current}
      form={form}
      onFinish={onFinish}
    />
  );
};

export default ManageRole;
