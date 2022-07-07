import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Status from "../../../Components/Status";
import { ProviderType } from "../../../State/ActionTypes/ProvidersActionTypes";

interface IProviderNumberTable {
  data: ProviderType[];
  loading: boolean;
}

const columns: ColumnsType<ProviderType> = [
  { title: "STT", key: "ordinalNumber", dataIndex: "ordinalNumber" },

  {
    title: "Tên khách hàng",
    key: "customerName",
    dataIndex: "customerName",
  },

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
    title: "Hạn sử dụng",
    key: "dateValid",
    dataIndex: "dateValid",
    render(value, record, index) {
      return <>{moment(value.toDate()).format("HH:mm - DD/MM/YYYY")}</>;
    },
  },

  {
    title: "Trạng thái",
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
      return value.name ?   <>{value.name}</> : <></>;
    },
  },
  {
    key: "details",
    render(value, record, index) {
      return (
        <Link
          to={`/provider/${record.id}`}
          style={{ color: "#4277FF", textDecorationLine: "underline" }}
        >
          Chi tiết
        </Link>
      );
    },
  },
];

const ProviderNumberTable: FC<IProviderNumberTable> = (props) => {
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

export default ProviderNumberTable;
