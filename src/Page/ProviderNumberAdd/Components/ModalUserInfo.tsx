import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import React, { FC } from "react";
import styles from "./ModalUserInfo.module.scss";

interface IModalUserInfo {
  modalUserInfoVisible: boolean;
  setModalUserInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onFinishModalUserInfo: (values: any) => void;
  loading: boolean;
}

const { Title, Text } = Typography;

const ModalUserInfo: FC<IModalUserInfo> = (props) => {
  return (
    <Modal
      width={570}
      centered
      visible={props.modalUserInfoVisible}
      onCancel={() => props.setModalUserInfoVisible(false)}
      footer={null}
      closable={false}
    >
      <div className={styles.modalContainer}>
        <Title level={3} className={styles.title}>
          Điền thông tin của bạn
        </Title>
        <Form
          name="userInfo-form"
          layout="vertical"
          onFinish={props.onFinishModalUserInfo}
        >
          <Form.Item
            name="name"
            label={<Text strong>Họ và tên:</Text>}
            required={false}
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input size="large" placeholder="Nhập họ và tên của bạn" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={<Text strong>Số điện thoại:</Text>}
            required={false}
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input size="large" placeholder="Nhập số điện thoại của bạn" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<Text strong>Email:</Text>}
            rules={[{ type: "email", message: "Email không hợp lệ" }]}
          >
            <Input size="large" placeholder="Nhập email của bạn" />
          </Form.Item>

          <Row justify="center" gutter={16} className={styles.buttonContainer}>
            <Col>
              <Button
                className={styles.btn}
                onClick={() => props.setModalUserInfoVisible(false)}
                type="primary"
                ghost
                size="large"
              >
                Hủy Bỏ
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                className={styles.btn}
                htmlType="submit"
                loading={props.loading}
              >
                Xác nhận
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalUserInfo;
