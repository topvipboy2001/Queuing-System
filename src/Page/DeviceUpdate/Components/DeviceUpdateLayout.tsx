import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeviceAddType } from "../../../State/ActionTypes/DevicesActionTypes";
import { DeviceTypeType } from "../../../State/ActionTypes/DeviceTypesActionTypes";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";
import TagRender from "../../DeviceAdd/Components/TagRender";
import styles from "./DeviceUpdateLayout.module.scss";

interface IDeviceAddLayout {
  deviceTypeLoading: boolean;
  deviceTypeData: DeviceTypeType[];
  serviceLoading: boolean;
  serviceData: ServiceType[];
  loading: boolean;
  initialValues: any;
  onFinish: (values: DeviceAddType) => void;
}

const { Option } = Select;

const DeviceUpdateLayout: FC<IDeviceAddLayout> = (props) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(props.initialValues);
  }, [props.initialValues, form]);

  return (
    <Form
      form={form}
      name="device-update"
      layout="vertical"
      className={styles.section}
      onFinish={props.onFinish}
    >
      <Row>
        <Col>
          <Typography.Title className={styles.title} level={2}>
            Quản lý thiết bị
          </Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <Card>
            <Row>
              <Col>
                <Typography.Title className={styles.title} level={3}>
                  Thông tin thiết bị
                </Typography.Title>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="id"
                  label={
                    <Typography.Text strong>
                      Mã thiết bị: <span style={{ color: "#FF4747" }}>*</span>{" "}
                    </Typography.Text>
                  }
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thiết bị" },
                  ]}
                >
                  <Input size="large" placeholder="Nhập mã thiết bị" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="deviceType"
                  label={
                    <Typography.Text strong>
                      Loại thiết bị: <span style={{ color: "#FF4747" }}>*</span>{" "}
                    </Typography.Text>
                  }
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng chọn loại thiết bị" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Chọn loại thiết bị"
                    loading={props.deviceTypeLoading}
                    suffixIcon={
                      <CaretDownOutlined
                        style={{ fontSize: "20px", color: "#FF7506" }}
                      />
                    }
                  >
                    {props.deviceTypeData.map((value, index) => (
                      <Option key={index} value={value.id}>
                        {value.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col flex={1}>
                <Form.Item
                  name="name"
                  label={
                    <Typography.Text strong>
                      Tên thiết bị: <span style={{ color: "#FF4747" }}>*</span>{" "}
                    </Typography.Text>
                  }
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng nhập tên thiết bị" },
                  ]}
                >
                  <Input size="large" placeholder="Nhập tên thiết bị" />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item
                  name="username"
                  label={
                    <Typography.Text strong>
                      Tên đăng nhập: <span style={{ color: "#FF4747" }}>*</span>{" "}
                    </Typography.Text>
                  }
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập" },
                  ]}
                >
                  <Input size="large" placeholder="Nhập tài khoản" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="IPAddress"
                  label={
                    <Typography.Text strong>
                      Địa chỉ IP: <span style={{ color: "#FF4747" }}>*</span>{" "}
                    </Typography.Text>
                  }
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ IP" },
                  ]}
                >
                  <Input size="large" placeholder="Nhập địa chỉ IP" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label={
                    <Typography.Text strong>
                      Mật khẩu: <span style={{ color: "#FF4747" }}>*</span>{" "}
                    </Typography.Text>
                  }
                  required={false}
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                >
                  <Input.Password size="large" placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col flex={1}>
                <Form.Item
                  name="services"
                  label={
                    <Typography.Text strong>
                      Dịch vụ sử dụng:{" "}
                      <span style={{ color: "#FF4747" }}>*</span>{" "}
                    </Typography.Text>
                  }
                  required={false}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập dịch vụ sử dụng",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    size="large"
                    placeholder="Nhập dịch vụ sử dụng"
                    loading={props.serviceLoading}
                    tagRender={TagRender}
                  >
                    {props.serviceData.map((value, index) => (
                      <Option key={index} value={value.id}>
                        {value.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <div style={{ paddingBottom: 80 }}>
                  <Typography.Text type="secondary">
                    <span style={{ color: "#FF4747" }}>*</span> là trường thông
                    tin bắt buộc
                  </Typography.Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={32} justify="center" className={styles.buttonContainer}>
        <Col>
          <Link to="/devices">
            <Button type="primary" ghost size="large" className={styles.button}>
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
            Cập nhật
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DeviceUpdateLayout;
