import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { FC } from "react";
import { HistoryType } from "../../../State/ActionTypes/HistoryActionTypes";

interface IHistoryTable {
  loading: boolean;
  data: HistoryType[];
}

const columns: ColumnsType<HistoryType> = [
  {
    title: "Tên đăng nhập",
    key: "user",
    dataIndex: "user",
    render(value, record, index) {
      return value.username;
    },
  },

  {
    title: "Thời gian tác động",
    key: "timeInteract",
    dataIndex: "timeInteract",
    render(value, record, index) {
      return moment(value.toDate()).format("DD/MM/YYYY HH:mm:ss");
    },
  },

  {
    title: "IP thực hiện",
    key: "IPAddress",
    dataIndex: "IPAddress",
  },

  {
    title: "Thao tác thực hiện",
    key: "actionImplemented",
    dataIndex: "actionImplemented",
    render(value, record, index) {
      return record.content + " " + record.documentInteracted.id;
    },
  },
];

const HistoryTable: FC<IHistoryTable> = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.data.map((value, index) => ({ ...value, key: index }))}
      bordered
      size="middle"
      pagination={{ position: ["bottomRight"] }}
      loading={props.loading}
    />
  );
};

export default HistoryTable;
