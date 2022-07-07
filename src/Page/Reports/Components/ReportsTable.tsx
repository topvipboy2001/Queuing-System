import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { FC } from "react";
import Status from "../../../Components/Status";
import { ReportsType } from "../../../State/ActionTypes/ReportsActionTypes";

interface IReportsTable {
  data: ReportsType[];
  loading: boolean;
}

const columns: ColumnsType<ReportsType> = [
  { title: "Số thứ tự", key: "ordinalNumber", dataIndex: "ordinalNumber" },

  {
    title: "Tên dịch vụ",
    key: "services",
    dataIndex: "services",
    render(value, record, index) {
      return <>{value.name}</>;
    },
  },

  {
    title: "Thời gian cấp",
    key: "dateProvider",
    dataIndex: "dateProvider",
    render(value, record, index) {
      return <>{moment(value.toDate()).format("HH:mm - DD/MM/YYYY")}</>;
    },
  },

  {
    title: "Tình trạng",
    key: "status",
    dataIndex: "status",
    render(value, record, index) {
      switch (value) {
        case 0:
          return <Status type="error" text="Bỏ qua" />;
        case 1:
          return <Status type="waiting" text="Đang chờ" />;
        case 2:
          return <Status type="used" text="Đã sử dụng" />;
        default:
          return <Status type="error" text="Bỏ qua" />;
      }
    },
  },

  {
    title: "Nguồn cấp",
    key: "sourceProvider",
    dataIndex: "sourceProvider",
    render(value, record, index) {
      return <>{value.name}</>;
    },
  },
];

const ReportsTable: FC<IReportsTable> = (props) => {
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

export default ReportsTable;
