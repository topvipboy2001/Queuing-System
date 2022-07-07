import { Select } from "antd";
import React, { FC } from "react";
import { RoleType } from "../../../State/ActionTypes/RolesActionType";

interface IRoleOption {
  roleData: RoleType[];
}

const RoleOption: FC<IRoleOption> = (props) => {
  return (
    <>
      {props.roleData.map((value, index) => (
        <Select.Option key={index} value={value.id}>
          {value.name}
        </Select.Option>
      ))}
    </>
  );
};

export default RoleOption;
