import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

interface Datatype {
  key: string;
  name: string;
  amountNumber: number;
  description: string;
}

const columns: ColumnsType<Datatype> = [
  {
    title: "Tên vai trò",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Số người dùng",
    key: "amountUser",
    dataIndex: "amountUser",
  },

  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
  },

  {},
];

const data: Datatype[] = [
 
];

const ManageRoleTable = () => {
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

export default ManageRoleTable;
