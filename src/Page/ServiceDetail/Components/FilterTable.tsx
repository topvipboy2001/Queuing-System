import { CaretDownOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { FC } from "react";
import SearchInput from "../../../Components/SearchInput";
import { ProviderType } from "../../../State/ActionTypes/ProvidersActionTypes";
import styles from "./FilterTable.module.scss";
import ServiceDetailTable from "./ServiceDetailTable";

interface IFilterTable {
  providerData: ProviderType[];
  providerLoading: boolean;
}

const { Option } = Select;

const FilterTable: FC<IFilterTable> = (props) => {
  return (
    <Card className={styles.card}>
      <Form layout="vertical">
        <Row gutter={12} style={{ height: "100%" }}>
          <Col flex="auto">
            <Space size={12}>
              <Form.Item
                className={styles.selectContianer}
                label={<Typography.Text strong>Trạng thái</Typography.Text>}
              >
                <Select
                  size="large"
                  defaultValue={null}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ fontSize: "20px", color: "#FF7506" }}
                    />
                  }
                >
                  <Option value={null}>Tất cả</Option>
                  <Option value={0}>Bỏ qua</Option>
                  <Option value={1}>Đang chờ</Option>
                  <Option value={2}>Đã sử dụng</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<Typography.Text strong>Chọn thời gian</Typography.Text>}
              >
                <Form.Item noStyle>
                  <DatePicker size="large" />
                </Form.Item>

                <Form.Item noStyle>
                  <DatePicker size="large" />
                </Form.Item>
              </Form.Item>
            </Space>
          </Col>
          <Col flex="206px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
            >
              <SearchInput placeholder="Nhập từ khóa" size="large" />
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
