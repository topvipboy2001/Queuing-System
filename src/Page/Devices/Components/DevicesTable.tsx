import { ColumnsType } from "antd/lib/table";
import { Table } from "antd";
import React from "react";

interface Datatype {
  key: string;
  id: string;
  name: string;
  IPAddess: string;
  active: boolean;
  connect: boolean;
  service: string[];
}

const columns: ColumnsType<Datatype> = [
  {
    title: "Mã thiết bị",
    key: "id",
    dataIndex: "id",
  },

  {
    title: "Tên thiết bị",
    key: "name",
    dataIndex: "name",
  },

  {
    title: "Địa chỉ IP",
    key: "IPAddess",
    dataIndex: "IPAddess",
  },

  {
    title: "Trạng thái hoạt động",
    key: "active",
    dataIndex: "active",
  },

  {
    title: "Trạng thái kết nối",
    key: "connect",
    dataIndex: "connect",
  },

  {
    title: "Dịch vụ sửa dụng",
    key: "service",
    dataIndex: "service",
  },
  {},
  {},
];

const data: Datatype[] = [
  {
    key: "1",
    id: "asdf",
    name: "Kiosk",
    IPAddess: "111.111.111",
    active: true,
    connect: true,
    service: ["hello", "hello", "hello"],
  },
  {
    key: "2",
    id: "asdf",
    name: "Kiosk",
    IPAddess: "111.111.111",
    active: true,
    connect: true,
    service: ["hello", "hello", "hello"],
  },
];

const DevicesTable = () => {
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

export default DevicesTable;
