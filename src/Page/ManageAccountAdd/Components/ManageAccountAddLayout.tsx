import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RoleType } from "../../../State/ActionTypes/RolesActionType";
import { UserAddType } from "../../../State/ActionTypes/UsersActionTypes";
import styles from "./ManageAccountAddLayout.module.scss";

interface IManageAccountLayout {
  roleLoading: boolean;
  roleData: RoleType[];
  onFinish: (values: UserAddType) => void;
  loading: boolean;
}

const { Option } = Select;

const ManageAccountAddLayout: FC<IManageAccountLayout> = (props) => {
  return (
    <Form
      name="add-user"
      layout="vertical"
      className={styles.section}
      onFinish={props.onFinish}
    >
      <Row>
        <Col>
          <Typography.Title level={2} className={styles.title}>
            Thông tin tài khoản
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
                  name="name"
                  required={false}
                  label={<Typography.Text strong>Họ tên:</Typography.Text>}
                  rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                >
                  <Input size="large" placeholder="Nhập họ tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="username"
                  required={false}
                  label={
                    <Typography.Text strong>Tên đăng nhập:</Typography.Text>
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập" },
                  ]}
                >
                  <Input size="large" placeholder="Nhập tên đăng nhập" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  required={false}
                  label={
                    <Typography.Text strong>Số điện thoại:</Typography.Text>
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input size="large" placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  required={false}
                  label={<Typography.Text strong>Mật khẩu:</Typography.Text>}
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                >
                  <Input.Password size="large" placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="email"
                  label={<Typography.Text strong>Email:</Typography.Text>}
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                >
                  <Input size="large" placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  required={false}
                  label={
                    <Typography.Text strong>Nhập lại mật khẩu:</Typography.Text>
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Hai trường mật khẩu bạn nhập không giống nhau"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Nhập lại mật khẩu"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="role"
                  label={<Typography.Text strong>Vai trò:</Typography.Text>}
                  rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                  required={false}
                >
                  <Select
                    loading={props.roleLoading}
                    disabled={props.roleLoading}
                    allowClear
                    size="large"
                    placeholder="Chọn vai trò"
                    suffixIcon={
                      <CaretDownOutlined
                        style={{ fontSize: "20px", color: "#FF7506" }}
                      />
                    }
                  >
                    {props.roleData.map((value, index) => (
                      <Select.Option key={index} value={value.id}>
                        {value.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="isActive"
                  label={<Typography.Text strong>Tình trạng:</Typography.Text>}
                  rules={[
                    { required: true, message: "Vui lòng chọn tình trạng" },
                  ]}
                  required={false}
                  initialValue={true}
                >
                  <Select
                    allowClear
                    size="large"
                    suffixIcon={
                      <CaretDownOutlined
                        style={{ fontSize: "20px", color: "#FF7506" }}
                      />
                    }
                  >
                    <Option key={1} value={false}>
                      Ngưng hoạt động
                    </Option>
                    <Option key={2} value={true}>
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
          <Link to="/setting/accounts">
            <Button size="large" type="primary" ghost className={styles.button}>
              Hủy bỏ
            </Button>
          </Link>
        </Col>
        <Col>
          <Button
            loading={props.loading}
            htmlType="submit"
            size="large"
            type="primary"
            className={styles.button}
          >
            Thêm
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ManageAccountAddLayout;
