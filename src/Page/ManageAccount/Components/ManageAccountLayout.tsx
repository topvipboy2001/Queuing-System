import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Form, Row, Select, Typography } from "antd";
import React from "react";
import SearchInput from "../../../Components/SearchInput";
import styles from "./ManageAccountLayout.module.scss";
import ManageAccountTable from "./ManageAccountTable";

const { Option } = Select;

const ManageAccountLayout = () => {
  return (
    <div className={styles.section}>
      <Typography.Title level={2} className={styles.title}>
        Danh sách tài khoản
      </Typography.Title>
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Tên vai trò</Typography.Text>}
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
                <Option value={true}>Hoạt động</Option>
                <Option value={false}>Ngưng hoạt động </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
            >
              <SearchInput size="large" placeholder="Nhập từ khóa" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col flex="auto">
          <ManageAccountTable />
        </Col>
        <Col flex="100px"></Col>
      </Row>
    </div>
  );
};

export default ManageAccountLayout;
