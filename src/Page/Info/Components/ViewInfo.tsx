import { Card, Form, Input, Row, Col } from "antd";
import React from "react";

const ViewInfo = () => {
  return (
    <Card bordered={false}>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col flex="434px"></Col>
          <Col flex="auto">
            <Form.Item label="Tên người tuyền dụng">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Email:">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item label="Tên đăng nhập">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Mật Khẩu">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Vai trò:">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ViewInfo;
