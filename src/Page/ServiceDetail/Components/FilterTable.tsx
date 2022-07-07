import { Card, Col, DatePicker, Form, Row, Space, Typography } from "antd";
import React from "react";
import SearchInput from "../../../Components/SearchInput";
import styles from "./FilterTable.module.scss";
import ServiceDetailTable from "./ServiceDetailTable";

const FilterTable = () => {
  return (
    <Card className={styles.card}>
      <Form layout="vertical">
        <Row gutter={12}>
          <Col flex="auto">
            <Space size={12}>
              <Form.Item
                className={styles.selectContianer}
                label={<Typography.Text strong>Trạng thái</Typography.Text>}
              >
                <SearchInput size="large" />
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
      <ServiceDetailTable />
    </Card>
  );
};

export default FilterTable;
