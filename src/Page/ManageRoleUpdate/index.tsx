import { message } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  roleGetByIdAction,
  roleUpdateByIdAction,
} from "../../State/Actions/RolesActions";
import { RoleAddType } from "../../State/ActionTypes/RolesActionType";
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
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.role);
  const [form] = useForm();

  const [checkAllA, setCheckAllA] = useState(false);
  const [checkAllB, setCheckAllB] = useState(false);
  const [checkAllC, setCheckAllC] = useState(false);

  useEffect(() => {
    const fetchRoleById = async () => {
      try {
        if (id) {
          await dispatch(roleGetByIdAction(id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoleById();
  }, [dispatch, id]);

  useEffect(() => {
    form.setFieldsValue({
      name: state.current.name,
      description: state.current.description,
      authorityA: state.current.authority.filter((value) => value[0] === "a"),
      authorityB: state.current.authority.filter((value) => value[0] === "b"),
      authorityC: state.current.authority.filter((value) => value[0] === "c"),
    });

    //eslint-disable-next-line
  }, [state.current]);

  const onFinish = async (values: ValuesSubmitRoleUpdateType) => {
    console.log(values);
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
      if (id) {
        await dispatch(roleUpdateByIdAction(id, actionValue));
        message.success("Cập nhật vai trò thành công!");
      } else {
        Promise.reject();
      }
    } catch (error) {
      console.log(error);
      message.error("Cập nhật vai trò không thành công!");
    }
  };

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

  return (
    <ManageRoleUpdateLayout
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

export default ManagerRoleUpdate;
