import { message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleAddAction } from "../../State/Actions/RoleActions";
import { RoleAddType } from "../../State/ActionTypes/RoleActionType";
import { RootStore } from "../../State/Store";
import ManageRoleAddLayout from "./Components/ManageRoleAddLayout";

export type valuesSubmitRoleAddType = {
  name: string;
  description: string;
  authorityA: string[];
  authorityB: string[];
  authorityC: string[];
};

const ManageRoleAdd = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.role);

  const onFinish = async (values: valuesSubmitRoleAddType) => {
    const authority = [
      ...(values.authorityA ? values.authorityA : []),
      ...(values.authorityB ? values.authorityB : []),
      ...(values.authorityC ? values.authorityC : []),
    ];
    const actionValue: RoleAddType = {
      name: values.name,
      description: values.description,
      authority: authority,
    };
    try {
      await dispatch(roleAddAction(actionValue));
      message.success("adding a role success!");
    } catch (error) {
      console.log(error);
      message.error("adding a role error!");
    }
  };

  return <ManageRoleAddLayout onFinish={onFinish} loading={state.loading} />;
};

export default ManageRoleAdd;
