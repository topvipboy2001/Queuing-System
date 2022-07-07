import React, { Dispatch, FC, useEffect } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Typography,
} from "antd";

import styles from "./ServiceUpdateLayout.module.scss";
import { useForm } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";

interface IServiceAddLayout {
  prefix: boolean;
  setPrefix: Dispatch<React.SetStateAction<boolean>>;

  surfix: boolean;
  setSurfix: Dispatch<React.SetStateAction<boolean>>;

  increase: boolean;
  setIncrease: Dispatch<React.SetStateAction<boolean>>;

  loading: boolean;
  onFinish: (values: ServiceType) => void;
  initialValues: any;
}

const { Text, Title } = Typography;

const ServiceUpdateLayout: FC<IServiceAddLayout> = (props) => {
  const { prefix, setPrefix, surfix, setSurfix, increase, setIncrease } = props;
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(props.initialValues);
  }, [props.initialValues, form]);

  return (
    <Form
      form={form}
      name="service-add"
      layout="vertical"
      className={styles.section}
      onFinish={props.onFinish}
    >
      <Title level={2} className={styles.title}>
        Quản lý dịch vụ
      </Title>
      <Card bordered>
        <Row gutter={24}>
          <Col span={24}>
            <Title level={4} className={styles.title}>
              Thông tin dịch vụ
            </Title>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id"
              label={<Text strong>Mã dịch vụ:</Text>}
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập mã dịch vụ" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="name"
              label={<Text strong>Tên dịch vụ:</Text>}
              required={false}
              rules={[{ required: true, message: "Vui lòng nhập mã dịch vụ" }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label={<Text strong>Mô tả:</Text>}>
              <Input.TextArea
                size="large"
                placeholder="Mô tả dịch vụ"
                style={{ height: "150px" }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Title level={4} className={styles.title}>
              Quy tắc cấp số
            </Title>
          </Col>

          <Col span={12}>
            <div className={styles.providerContainer}>
              <Checkbox
                className={styles.providerBox1}
                checked={increase}
                onChange={(e) => setIncrease(!increase)}
              >
                <Text className={styles.checkBoxLabel}>Tăng tự động từ:</Text>
              </Checkbox>
              <Form.Item noStyle name={increase ? "increaseFrom" : undefined}>
                <InputNumber
                  min={0}
                  disabled={!increase}
                  size="large"
                  className={styles.providerInput}
                  controls={false}
                />
              </Form.Item>
              <Text className={styles.checkBoxLabel}>đến</Text>
              <Form.Item noStyle name={increase ? "increaseTo" : undefined}>
                <InputNumber
                  min={0}
                  disabled={!increase}
                  size="large"
                  className={styles.providerInput}
                  controls={false}
                />
              </Form.Item>
            </div>

            <div className={styles.providerContainer}>
              <Checkbox
                className={styles.providerBox1}
                checked={prefix}
                onChange={(e) => setPrefix(!prefix)}
              >
                <Text className={styles.checkBoxLabel}>Prefix:</Text>
              </Checkbox>
              <Form.Item noStyle name={prefix ? "prefix" : undefined}>
                <InputNumber
                  min={0}
                  disabled={!prefix}
                  size="large"
                  className={styles.providerInput}
                  controls={false}
                />
              </Form.Item>
            </div>

            <div className={styles.providerContainer}>
              <Checkbox
                className={styles.providerBox1}
                checked={surfix}
                onChange={(e) => setSurfix(!surfix)}
              >
                <Text className={styles.checkBoxLabel}>Surfix:</Text>
              </Checkbox>
              <Form.Item noStyle name={surfix ? "surfix" : undefined}>
                <InputNumber
                  min={0}
                  disabled={!surfix}
                  size="large"
                  className={styles.providerInput}
                  controls={false}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="isReset"
              valuePropName="checked"
              initialValue={false}
            >
              <Checkbox>
                <Text className={styles.checkBoxLabel}>Reset mỗi ngày</Text>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Row gutter={32} justify="center" className={styles.buttonContainer}>
        <Col>
          <Link to="/services">
            <Button
              size="large"
              type="primary"
              ghost
              className={styles.button}
              disabled={props.loading}
            >
              Hủy bỏ
            </Button>
          </Link>
        </Col>
        <Col>
          <Button
            loading={props.loading}
            size="large"
            type="primary"
            className={styles.button}
            htmlType="submit"
          >
            Thêm dịch vụ
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ServiceUpdateLayout;
