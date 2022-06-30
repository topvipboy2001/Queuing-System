import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetAction } from "../../State/Actions/UserActions";
import { RootStore } from "../../State/Store";
import ManageAccountLayout from "./Components/ManageAccountLayout";

const ManageAccount = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await dispatch(userGetAction());
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  return <ManageAccountLayout loading={state.loading} data={state.current} />;
};

export default ManageAccount;
