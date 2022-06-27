import { Col, Form, Row, Typography } from "antd";
import React from "react";
import SearchInput from "../../../Components/SearchInput";
import styles from "./ManageRoleLayout.module.scss";
import ManageRoleTable from "./ManageRoleTable";

const ManageRoleLayout = () => {
  return (
    <div className={styles.section}>
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Typography.Title level={2} className={styles.title}>
              Danh sách vai trò
            </Typography.Title>
          </Col>

          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
            >
              <SearchInput size="large" placeholder="Nhập từ khóa" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <ManageRoleTable />
          </Col>
          <Col flex="100px"></Col>
        </Row>
      </Form>
    </div>
  );
};

export default ManageRoleLayout;