import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { UserType } from "../../../State/ActionTypes/UserActionTypes";

interface IManageAccountTable {
  loading: boolean;
  data: UserType[];
}

const columns: ColumnsType<any> = [
  {
    title: "Tên đăng nhập",
    key: "username",
    dataIndex: "username",
  },

  {
    title: "Họ tên",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Số điện thoại",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },

  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Vai trò",
    key: "role",
    dataIndex: "role",
  },

  {
    title: "Trạng thái hoạt động",
    key: "isActive",
    dataIndex: "isActive",
    render: (value, record, index) => {
      return value ? "Hoạt động" : "Ngừng hoạt động";
    },
  },

  {
    key: "action",

    render: (value, record, index) => {
      return (
        <Link
          to={`/setting/accounts/update/${value.id}`}
          style={{ color: "#4277FF", textDecorationLine: "underline" }}
        >
          Cập nhật
        </Link>
      );
    },
  },
];

const ManageAccountTable: FC<IManageAccountTable> = (props) => {
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

export default ManageAccountTable;
