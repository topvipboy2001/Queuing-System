import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleGetAction } from "../../State/Actions/RolesActions";
import { RootStore } from "../../State/Store";
import ManageRoleLayout from "./Components/ManageRoleLayout";

const ManageRole = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.roles);

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

  return <ManageRoleLayout loading={state.loading} data={state.current} />;
};

export default ManageRole;
