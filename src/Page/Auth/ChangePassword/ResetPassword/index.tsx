import { Button, Col, Form, Input, Row, Typography } from "antd";
import React, { FC } from "react";
import { valuesSubmitResetPasswordType } from "..";
import styles from "./ResetPassword.module.scss";

interface IResetPassword {
  loading: boolean;
  message: string | undefined;
  onFinish: (values: valuesSubmitResetPasswordType) => void;
}

const ResetPassword: FC<IResetPassword> = (props) => {
  return (
    <Form name="reset-password" layout="vertical" onFinish={props.onFinish}>
      <Row justify="center">
        <Col>
          <Typography.Text className={styles.title}>
            Đặt lại mật khẩu
          </Typography.Text>
        </Col>
      </Row>
      <Form.Item
        name="password"
        label="Mật khẩu"
        required={false}
        rules={[
          {
            min: 8,
            message: "Vui lòng nhập đủ 8 ký tự",
          },
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
        ]}
        validateStatus={props.message && "error"}
        help={props.message ? props.message : undefined}
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Nhập lại mật khẩu"
        required={false}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },

          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Hai trường mật khẩu bạn nhập không giống nhau")
              );
            },
          }),
        ]}
        validateStatus={props.message && "error"}
        help={props.message ? props.message : undefined}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Row justify="center">
        <Col>
          <Button
            loading={props.loading}
            size="large"
            htmlType="submit"
            type="primary"
            className={styles.button}
          >
            Xác nhận
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ResetPassword;
