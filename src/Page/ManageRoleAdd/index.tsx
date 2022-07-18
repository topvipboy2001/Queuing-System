import { message } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleAddAction } from "../../State/Actions/RolesActions";
import { RoleAddType } from "../../State/ActionTypes/RolesActionType";
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
  const state = useSelector((state: RootStore) => state.roles);
  const [form] = useForm();

  const [checkAllA, setCheckAllA] = useState(false);
  const [checkAllB, setCheckAllB] = useState(false);
  const [checkAllC, setCheckAllC] = useState(false);

  const onChangeAllA = (e: CheckboxChangeEvent) => {
    setCheckAllA(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ authorityA: ["ax", "ay", "az"] });
    } else {
      form.setFieldsValue({ authorityA: [] });
    }
  };

  const onChangeACell = () => {
    if (form.getFieldValue("authorityA").length >= 3) {
      setCheckAllA(true);
    } else {
      setCheckAllA(false);
    }
  };

  const onChangeAllB = (e: CheckboxChangeEvent) => {
    setCheckAllB(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ authorityB: ["bx", "by", "bz"] });
    } else {
      form.setFieldsValue({ authorityB: [] });
    }
  };

  const onChangeBCell = () => {
    if (form.getFieldValue("authorityB").length >= 3) {
      setCheckAllB(true);
    } else {
      setCheckAllB(false);
    }
  };

  const onChangeAllC = (e: CheckboxChangeEvent) => {
    setCheckAllC(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ authorityC: ["cx", "cy", "cz"] });
    } else {
      form.setFieldsValue({ authorityC: [] });
    }
  };

  const onChangeCCell = () => {
    if (form.getFieldValue("authorityC").length >= 3) {
      setCheckAllC(true);
    } else {
      setCheckAllC(false);
    }
  };

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
      message.success("Thêm vai trò thành công!");
    } catch (error) {
      console.log(error);
      message.error("Thêm vai trò không thành công!");
    }
  };

  return (
    <ManageRoleAddLayout
      onFinish={onFinish}
      loading={state.loading}
      form={form}
      checkAllA={checkAllA}
      onChangeACell={onChangeACell}
      onChangeAllA={onChangeAllA}
      checkAllB={checkAllB}
      onChangeBCell={onChangeBCell}
      onChangeAllB={onChangeAllB}
      checkAllC={checkAllC}
      onChangeCCell={onChangeCCell}
      onChangeAllC={onChangeAllC}
    />
  );
};

export default ManageRoleAdd;
