import { ColumnsType } from "antd/lib/table";
import React from "react";
import { Table } from "antd";

interface Datatype {
  ordinalNumber: number;
  status: string;
}

const columns: ColumnsType<Datatype> = [
  {
    title: "Mã thiết bị",
    key: "ordinalNumber",
    dataIndex: "ordinalNumber",
  },

  {
    title: "Tên thiết bị",
    key: "status",
    dataIndex: "status",
  },
];

const data: Datatype[] = [
  {
    ordinalNumber: 201001,
    status: "Đã hoàn thành",
  },
  {
    ordinalNumber: 201002,
    status: "Đã hoàn thành",
  },
];

const ServiceDetailTable = () => {
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

export default ServiceDetailTable;
