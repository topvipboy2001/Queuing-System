import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../../State/Store";
import ManageRoleUpdateLayout from "./Components/ManageRoleUpdateLayout";

export type ValuesSubmitRoleUpdateType = {
  name: string;
  description: string;
  authorityA: string[];
  authorityB: string[];
  authorityC: string[];
};

const ManagerRoleUpdate = () => {
  const { id } = useParams();
  const state = useSelector((state: RootStore) => state.roles);

  const onFinish = async (values: ValuesSubmitRoleUpdateType) => {
    console.log(values);
  };

  return <ManageRoleUpdateLayout onFinish={onFinish} loading={state.loading} />;
};

export default ManagerRoleUpdate;
