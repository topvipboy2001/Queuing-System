import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Status from "../../../Components/Status";
import { UserType } from "../../../State/ActionTypes/UsersActionTypes";

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
    render(value, record, index) {
      return <>{value.name}</>;
    },
  },

  {
    title: "Trạng thái hoạt động",
    key: "isActive",
    dataIndex: "isActive",
    render: (value, record, index) => {
      return value ? (
        <Status type="success" text="Hoạt động" />
      ) : (
        <Status type="error" text="Ngừng hoạt động" />
      );
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
