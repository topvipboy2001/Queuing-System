import {
  Card,
  Form,
  Input,
  Row,
  Col,
  FormInstance,
  Avatar,
  Typography,
  Badge,
} from "antd";
import React, { FC } from "react";
import { UserType } from "../../../State/ActionTypes/UsersActionTypes";
import avatarImg from "../../../Assets/avatar.svg";
import styles from "./ViewInfo.module.scss";
import { ReactComponent as cameraSvg } from "../../../Assets/camera.svg";
import Icon from "@ant-design/icons";

interface IViewInfo {
  data: UserType;
  loading: boolean;
  form: FormInstance<any>;
}

const ViewInfo: FC<IViewInfo> = (props) => {
  return (
    <Card bordered={false}>
      <Form layout="vertical" form={props.form} name="info">
        <Row gutter={24}>
          <Col flex="248px">
            <div className={styles.avatarContainer}>
              <Avatar shape="circle" size={248} src={avatarImg} />
              <Icon className={styles.icon} component={cameraSvg} />
            </div>
            <Typography.Title className={styles.title} level={3}>
              {props.data.name}
            </Typography.Title>
          </Col>
          <Col flex="auto">
            <Form.Item label="Tên người dùng" name="name">
              <Input disabled size="large" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phoneNumber">
              <Input disabled size="large" />
            </Form.Item>
            <Form.Item label="Email:" name="email">
              <Input disabled size="large" />
            </Form.Item>
          </Col>
          <Col flex="auto">
            <Form.Item label="Tên đăng nhập" name="username">
              <Input disabled size="large" />
            </Form.Item>
            <Form.Item label="Mật Khẩu" name="password">
              <Input disabled size="large" />
            </Form.Item>
            <Form.Item label="Vai trò:" name="role">
              <Input disabled size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ViewInfo;
