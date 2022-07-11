import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

interface DataType {
  key: string;
  username: string;
  time: Date;
  ip: string;
  actionImplemented: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên đăng nhập",
    key: "username",
    dataIndex: "username",
  },

  {
    title: "Thời gian tác động",
    key: "time",
    dataIndex: "time",
    render(value, record, index) {
      return value.toString();
    },
  },

  {
    title: "IP thực hiện",
    key: "ip",
    dataIndex: "ip",
  },

  {
    title: "Thao tác thực hiện",
    key: "active",
    dataIndex: "actionImplemented",
  },
];

const data: DataType[] = [
  {
    key: "1",
    username: "topvipboy2001",
    time: new Date(),
    ip: "111.111.111.111",
    actionImplemented: "Cập nhật thông tin",
  },

  {
    key: "2",
    username: "topvipboy2001",
    time: new Date(),
    ip: "111.111.111.111",
    actionImplemented: "Cập nhật thông tin",
  },

  {
    key: "3",
    username: "topvipboy2001",
    time: new Date(),
    ip: "111.111.111.111",
    actionImplemented: "Cập nhật thông tin",
  },
];

const HistoryTable = () => {
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

export default HistoryTable;
