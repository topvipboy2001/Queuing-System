import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Card, Form, Select, Space, Typography } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProviderAddType } from "../../../State/ActionTypes/ProvidersActionTypes";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";
import styles from "./ProviderNumberAddLayout.module.scss";

interface IProviderNumberAddLayout {
  servicesData: ServiceType[];
  loading: boolean;
  servicesLoading: boolean;
  onFinish: (values: ProviderAddType) => void;
}

const { Title, Text } = Typography;

const ProviderNumberAddLayout: FC<IProviderNumberAddLayout> = (props) => {
  return (
    <div className={styles.section}>
      <Title level={2} className={styles.title}>
        Quản lý cấp số
      </Title>
      <Card className={styles.card}>
        <Form
          layout="vertical"
          className={styles.form}
          onFinish={props.onFinish}
        >
          <Title
            className={`${styles.title} ${styles.titleCard}`}
            style={{ marginBottom: "20px" }}
          >
            Cấp số mới
          </Title>
          <Space
            direction="vertical"
            align="center"
            className={styles.inputContainer}
          >
            <Text strong className={styles.label}>
              Dịch vụ khách hàng lựa chọn
            </Text>
            <Form.Item
              name="service"
              required={false}
              rules={[{ required: true, message: "Vui lòng chọn dịch vụ" }]}
            >
              <Select
                placeholder="Chọn dịch vụ"
                loading={props.servicesLoading}
                style={{ width: "400px" }}
                size="large"
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: "20px", color: "#FF7506" }}
                  />
                }
              >
                {props.servicesData.map((value, index) => (
                  <Select.Option key={index} value={value.id}>
                    {value.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Space size={32}>
            <Link to="/provider">
              <Button className={styles.btn} size="large" type="primary" ghost>
                Hủy bỏ
              </Button>
            </Link>
            <Button
              className={styles.btn}
              htmlType="submit"
              size="large"
              type="primary"
              loading={props.loading}
            >
              In số
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default ProviderNumberAddLayout;
