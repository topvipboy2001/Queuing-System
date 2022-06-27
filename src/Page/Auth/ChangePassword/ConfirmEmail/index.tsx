import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { valuesSubmitConfirmEmailType } from "..";
import styles from "./ConfirmEmail.module.scss";

interface IConfirmEmail {
  loading: boolean;
  message: string | undefined;
  onFinish: (values: valuesSubmitConfirmEmailType) => void;
}

const { Text } = Typography;

const ConfirmEmail: React.FC<IConfirmEmail> = (props) => {
  return (
    <Form
      className={styles.form}
      name="forget-password-form"
      layout="vertical"
      onFinish={props.onFinish}
    >
      <Row justify="center" className={styles.titleWrapper}>
        <Col>
          <Text className={styles.title}>Đặt lại mật khẩu</Text>
        </Col>
      </Row>

      <Form.Item
        name="email"
        label="Vui lòng nhập email để đặt lại mật khẩu của bạn *"
        required={false}
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
        validateStatus={props.message ? "error" : undefined}
        help={props.message ? props.message : undefined}
      >
        <Input size="large" disabled={props.loading} />
      </Form.Item>
      <Row justify="space-evenly">
        <Col>
          <Button
            disabled={props.loading}
            size="large"
            className={styles.button}
            type="primary"
            ghost
          >
            <Link to="/auth">Hủy</Link>
          </Button>
        </Col>
        <Col>
          <Button
            loading={props.loading}
            size="large"
            htmlType="submit"
            className={styles.button}
            type="primary"
          >
            Tiếp tục
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ConfirmEmail;
