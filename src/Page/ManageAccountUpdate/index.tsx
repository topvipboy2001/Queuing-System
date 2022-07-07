import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { roleGetAction } from "../../State/Actions/RolesActions";
import {
  userGetByIdAction,
  userUpdateByIdAction,
} from "../../State/Actions/UsersActions";
import { UserAddType } from "../../State/ActionTypes/UsersActionTypes";
import { RootStore } from "../../State/Store";
import ManageAccountUpdateLayout from "./Components/ManageAccountUpdateLayout";

const ManageAccountUpdate = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector((state: RootStore) => state.user);
  const roleState = useSelector((state: RootStore) => state.roles);
  const state = useSelector((state: RootStore) => state.users);
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    try {
      if (id) {
        dispatch(userGetByIdAction(id));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id]);

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

  useEffect(() => {
    setInitialValues({
      name: stateUser.current.name,
      username: stateUser.current.username,
      phoneNumber: stateUser.current.phoneNumber,
      password: stateUser.current.password,
      confirmPassword: stateUser.current.password,
      email: stateUser.current.email,
      role: stateUser.current.role.id,
      isActive: stateUser.current.isActive,
    });

    // eslint-disable-next-line
  }, [stateUser.current]);

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
      if (id) {
        await dispatch(userUpdateByIdAction(actionValue, id));
        message.success("Thêm tài khoản thành công!");
      } else {
        Promise.reject("Không tìm thấy Id");
      }
    } catch (error: any) {
      message.error(error);
    }
  };

  return (
    <ManageAccountUpdateLayout
      roleData={roleState.current}
      roleLoading={roleState.loading}
      onFinish={onFinish}
      initialValues={initialValues}
      loading={state.loading}
    />
  );
};

export default ManageAccountUpdate;
