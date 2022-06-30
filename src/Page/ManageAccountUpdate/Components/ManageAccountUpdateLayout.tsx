import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import React from "react";
import styles from "./ManageAccountUpdateLayout.module.scss";

const { Option } = Select;

const ManageAccountUpdateLayout = () => {
  return (
    <Form layout="vertical" className={styles.section}>
      <Row>
        <Col>
          <Typography.Title level={2} className={styles.title}>
            Quản lý tài khoản
          </Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Card bordered={false}>
            <Row gutter={24}>
              <Col span={24} style={{ marginBottom: "20px" }}>
                <Typography.Title level={3} className={styles.title}>
                  Quản lý tài khoản
                </Typography.Title>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={<Typography.Text strong>Họ tên:</Typography.Text>}
                >
                  <Input size="large" placeholder="Nhập họ tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Typography.Text strong>Tên đăng nhập:</Typography.Text>
                  }
                >
                  <Input size="large" placeholder="Nhập tên đăng nhập" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={
                    <Typography.Text strong>Số điện thoại:</Typography.Text>
                  }
                >
                  <Input size="large" placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Typography.Text strong>Mật khẩu:</Typography.Text>}
                >
                  <Input.Password size="large" placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={<Typography.Text strong>Email:</Typography.Text>}
                >
                  <Input size="large" placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Typography.Text strong>Nhập lại mật khẩu:</Typography.Text>
                  }
                >
                  <Input.Password
                    size="large"
                    placeholder="Nhập lại mật khẩu"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={<Typography.Text strong>Vai trò:</Typography.Text>}
                >
                  <Select
                    allowClear
                    size="large"
                    placeholder="Chọn vai trò"
                    suffixIcon={
                      <CaretDownOutlined
                        style={{ fontSize: "20px", color: "#FF7506" }}
                      />
                    }
                  >
                    <Option key={1} value={"Khám tim mạch"}>
                      Kế toán
                    </Option>
                    <Option key={2} value={"Khám sản phụ khoa"}>
                      Quản lý
                    </Option>
                    <Option key={3} value={"Khám răng hàm mặt "}>
                      Admin
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Typography.Text strong>Tình trạng:</Typography.Text>}
                >
                  <Select
                    allowClear
                    size="large"
                    defaultValue={"Khám sản phụ khoa"}
                    suffixIcon={
                      <CaretDownOutlined
                        style={{ fontSize: "20px", color: "#FF7506" }}
                      />
                    }
                  >
                    <Option key={1} value={"Khám tim mạch"}>
                      Tất cả
                    </Option>
                    <Option key={2} value={"Khám sản phụ khoa"}>
                      Ngưng hoạt động
                    </Option>
                    <Option key={3} value={"Khám răng hàm mặt "}>
                      Hoạt động
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={32} justify="center" className={styles.buttonContainer}>
        <Col>
          <Button size="large" type="primary" ghost className={styles.button}>
            Hủy bỏ
          </Button>
        </Col>
        <Col>
          <Button size="large" type="primary" className={styles.button}>
            Cập nhật
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ManageAccountUpdateLayout;
