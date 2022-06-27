import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

interface DataType {
  key: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  active: boolean;
}

const columns: ColumnsType<DataType> = [
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
    title: "Trạng thái hoạt động",
    key: "active",
    dataIndex: "active",
  },

  {},
];

const data: DataType[] = [

];

const ManageAccountTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      size="middle"
      pagination={{ position: ["bottomRight"] }}
    />
  );
};

export default ManageAccountTable;
