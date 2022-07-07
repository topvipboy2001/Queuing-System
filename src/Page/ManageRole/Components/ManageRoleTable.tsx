import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RoleType } from "../../../State/ActionTypes/RolesActionType";

interface IManageRoleTable {
  loading: boolean;
  data: RoleType[];
}

const columns: ColumnsType<RoleType> = [
  {
    title: "Tên vai trò",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Số người dùng",
    key: "amountOfUser",
    dataIndex: "amountOfUser",
  },

  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
  },

  {
    key: "action",

    render: (value, record, index) => {
      return (
        <Link
          to={`/setting/manage-roles/update/${value.id}`}
          style={{ color: "#4277FF", textDecorationLine: "underline" }}
        >
          Cập nhật
        </Link>
      );
    },
  },
];

const ManageRoleTable: FC<IManageRoleTable> = (props) => {
  return (
    <Table
      loading={props.loading}
      columns={columns}
      dataSource={props.data.map((value) => ({ ...value, key: value.id }))}
      bordered
      size="middle"
      pagination={{ position: ["bottomRight"] }}
    />
  );
};

export default ManageRoleTable;
