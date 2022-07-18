import { CaretDownOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  FormInstance,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { FC } from "react";
import DatePickerRange from "../../../Components/DatePickerRange";
import SearchInput from "../../../Components/SearchInput";
import {
  ProviderFilterGetServiceIDType,
  ProviderType,
} from "../../../State/ActionTypes/ProvidersActionTypes";
import styles from "./FilterTable.module.scss";
import ServiceDetailTable from "./ServiceDetailTable";

interface IFilterTable {
  providerData: ProviderType[];
  providerLoading: boolean;
  form: FormInstance;
  onFinish: (values: ProviderFilterGetServiceIDType) => void;
}

const { Option } = Select;

const FilterTable: FC<IFilterTable> = (props) => {
  return (
    <Card className={styles.card}>
      <Form
        layout="vertical"
        name="filter-provider-in-serviceDetail"
        form={props.form}
        onFinish={props.onFinish}
      >
        <Row gutter={12} style={{ height: "100%" }}>
          <Col flex="auto">
            <Space size={12}>
              <Form.Item
                className={styles.selectContianer}
                label={<Typography.Text strong>Trạng thái</Typography.Text>}
                name="status"
              >
                <Select
                  size="large"
                  defaultValue={null}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ fontSize: "20px", color: "#FF7506" }}
                    />
                  }
                  onChange={() => props.form.submit()}
                >
                  <Option value={null}>Tất cả</Option>
                  <Option value={0}>Bỏ qua</Option>
                  <Option value={1}>Đang chờ</Option>
                  <Option value={2}>Đã sử dụng</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<Typography.Text strong>Chọn thời gian</Typography.Text>}
                name="dateRange"
              >
                <DatePickerRange onChange={() => props.form.submit()} />
              </Form.Item>
            </Space>
          </Col>
          <Col flex="206px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
              name="search"
            >
              <SearchInput
                placeholder="Nhập từ khóa"
                size="large"
                onSearch={() => props.form.submit()}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <ServiceDetailTable
        providerData={props.providerData}
        providerLoading={props.providerLoading}
      />
    </Card>
  );
};

export default FilterTable;
