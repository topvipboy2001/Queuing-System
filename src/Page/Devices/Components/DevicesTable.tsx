import { ColumnsType } from "antd/lib/table";
import { Table, Typography } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { DeviceType } from "../../../State/ActionTypes/DevicesActionTypes";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";
import Status from "../../../Components/Status";

interface IDevicesTable {
  loading: boolean;
  data: DeviceType[];
}

const columns: ColumnsType<DeviceType> = [
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
    key: "IPAddress",
    dataIndex: "IPAddress",
  },

  {
    title: "Trạng thái hoạt động",
    key: "isActive",
    dataIndex: "isActive",
    render(value, record, index) {
      return value ? (
        <Status text="Hoạt động" type="success" />
      ) : (
        <Status text="Ngưng hoạt động" type="error" />
      );
    },
  },

  {
    title: "Trạng thái kết nối",
    key: "isConnect",
    dataIndex: "isConnect",
    render(value, record, index) {
      return value ? (
        <Status text="Kết nối" type="success" />
      ) : (
        <Status text="Mất kết nối" type="error" />
      );
    },
  },

  {
    title: "Dịch vụ sử dụng",
    key: "services",
    dataIndex: "services",

    render(value, record, index) {
      const text = value.map((item: ServiceType) => item.name).join(", ");
      return <Typography.Text>{text}</Typography.Text>;
    },
  },
  {
    key: "detail",
    render: (value, record, index) => {
      return (
        <Link
          to={`/devices/${record.id}`}
          style={{ color: "#4277FF", textDecorationLine: "underline" }}
        >
          Chi tiết
        </Link>
      );
    },
  },
  {
    key: "update",
    render: (value, record, index) => {
      return (
        <Link
          to={`/devices/update/${record.id}`}
          style={{ color: "#4277FF", textDecorationLine: "underline" }}
        >
          Cập nhật
        </Link>
      );
    },
  },
];

const DevicesTable: FC<IDevicesTable> = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.data.map((value) => ({ ...value, key: value.id }))}
      loading={props.loading}
      bordered
      size="middle"
      pagination={{ position: ["bottomRight"] }}
    />
  );
};

export default DevicesTable;
