import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Status from "../../../Components/Status";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";

interface IServicesTable {
  loading: boolean;
  data: ServiceType[];
}

const columns: ColumnsType<ServiceType> = [
  {
    title: "Mã dịch vụ",
    key: "id",
    dataIndex: "id",
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
    key: "isActive",
    dataIndex: "isActive",
    render(value, record, index) {
      return value ? (
        <Status type="success" text="Hoạt động" />
      ) : (
        <Status type="error" text="Ngưng hoạt động" />
      );
    },
  },

  {
    key: "detail",
    render(value, record, index) {
      return (
        <Link
          to={`/services/${record.id}`}
          style={{ color: "#4277FF", textDecorationLine: "underline" }}
        >
          Chi tiết
        </Link>
      );
    },
  },

  {
    key: "update",
    render(value, record, index) {
      return (
        <Link
          to={`/services/update/${record.id}`}
          style={{ color: "#4277FF", textDecorationLine: "underline" }}
        >
          Cập nhật
        </Link>
      );
    },
  },
];

const ServicesTable: FC<IServicesTable> = (props) => {
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

export default ServicesTable;
