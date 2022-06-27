import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

interface Datatype {
  key: string;
  id: string;
  name: string;
  description: string;
  active: boolean;
}

const columns: ColumnsType<Datatype> = [
  {
    title: "Mã dịch vụ",
    key: "id",
    dataIndex: "name",
  },
  {
    title: "Tên dịch vụ",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
  },

  {
    title: "Trạng thái hoạt động",
    key: "active",
    dataIndex: "active",
  },

  {},

  {},
];

const data: Datatype[] = [

];

const ServicesTable = () => {
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

export default ServicesTable;
