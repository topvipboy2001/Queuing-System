import { ColumnsType } from "antd/lib/table";
import React, { FC } from "react";
import { Table } from "antd";
import { ProviderType } from "../../../State/ActionTypes/ProvidersActionTypes";
import Status from "../../../Components/Status";

interface IServiceDetailTable {
  providerData: ProviderType[];
  providerLoading: boolean;
}

const columns: ColumnsType<ProviderType> = [
  {
    title: "Số thứ tự",
    key: "ordinalNumber",
    dataIndex: "ordinalNumber",
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
];

const ServiceDetailTable: FC<IServiceDetailTable> = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.providerData.map((value) => ({
        ...value,
        key: value.id,
      }))}
      loading={props.providerLoading}
      bordered
      size="middle"
      pagination={{ position: ["bottomRight"], pageSize: 9 }}
    />
  );
};

export default ServiceDetailTable;
