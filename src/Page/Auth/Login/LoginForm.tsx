import { Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginActions } from "../../../State/Actions/LoginActions";
import { RootStore } from "../../../State/Store";
import styles from "./LoginForm.module.scss";
import { InfoCircleOutlined } from "@ant-design/icons";

type valuesSubmitType = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state: RootStore) => state.login);

  const onFinish = async (values: valuesSubmitType) => {
    try {
      dispatch(LoginActions(values.username, values.password));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [state.current, navigate]);

  return (
    <Form name="login" layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="username"
        label="Tên đăng nhập"
        required={false}
        rules={[{ required: true, message: "Vui lòng điền tên đăng nhập" }]}
      >
        <Input
          status={state.message ? "error" : undefined}
          size="large"
          disabled={state.loading}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        required={false}
        rules={[{ required: true, message: "Vui lòng điền mật khẩu" }]}
        help={
          state.message ? (
            <div className={styles.warningWrapper}>
              <Row
                justify="start"
                align="middle"
                className={styles.warningContainer}
              >
                <Col>
                  <InfoCircleOutlined style={{ fontSize: 20 }} />
                </Col>
                <Col>
                  <Typography.Text className={styles.warningText}>
                    {state.message}
                  </Typography.Text>
                </Col>
              </Row>
            </div>
          ) : undefined
        }
      >
        <Input.Password
          disabled={state.loading}
          status={state.message ? "error" : undefined}
          size="large"
        />
      </Form.Item>

      <div className={styles.buttonContainer}>
        <Button
          htmlType="submit"
          type="primary"
          className={styles.button}
          loading={state.loading}
          size="large"
        >
          Đăng nhập
        </Button>
        <Link to="/auth/reset-password" className={styles.link}>
          Quên mật khẩu?
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
