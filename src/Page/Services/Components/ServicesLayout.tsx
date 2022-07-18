import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Form, FormInstance, Row, Select, Space, Typography } from "antd";
import React, { FC } from "react";
import ButtonSide from "../../../Components/ButtonSide";
import SearchInput from "../../../Components/SearchInput";
import {
  ServiceFilterType,
  ServiceType,
} from "../../../State/ActionTypes/ServicesActionTypes";
import styles from "./ServicesLayout.module.scss";
import ServicesTable from "./ServicesTable";
import { ReactComponent as addSvg } from "../../../Assets/AddSquare.svg";
import { useNavigate } from "react-router-dom";
import DatePickerRange from "../../../Components/DatePickerRange";

interface IServicesLayout {
  loading: boolean;
  data: ServiceType[];
  form: FormInstance<any>;
  onFinish: (values: ServiceFilterType) => void;
}

const { Option } = Select;

const ServicesLayout: FC<IServicesLayout> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <Row>
        <Col>
          <Typography.Title className={styles.title} level={2}>
            Quản lý dịch vụ
          </Typography.Title>
        </Col>
      </Row>
      <Form
        layout="vertical"
        onFinish={props.onFinish}
        name="filter-service"
        form={props.form}
      >
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Space size={24}>
              <Form.Item
                label={
                  <Typography.Text strong>Trạng thái hoạt động</Typography.Text>
                }
                className={styles.selectContianer}
                initialValue={null}
                name="isActive"
              >
                <Select
                  onChange={() => props.form.submit()}
                  size="large"
                  suffixIcon={
                    <CaretDownOutlined
                      style={{
                        fontSize: "20px",
                        color: "#FF7506",
                      }}
                    />
                  }
                >
                  <Option value={null}>Tất cả</Option>
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Ngưng hoạt động</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={<Typography.Text strong>Chọn thời gian</Typography.Text>}
                name="dateRange"
              >
                <DatePickerRange />
              </Form.Item>
            </Space>
          </Col>
          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
              name="search"
            >
              <SearchInput
                size="large"
                placeholder="Nhập từ khóa"
                onChange={() => props.form.submit()}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col flex="auto">
          <ServicesTable loading={props.loading} data={props.data} />
        </Col>
        <Col flex="100px">
          <ButtonSide
            content={[
              {
                label: "Thêm dịch vụ",
                icon: addSvg,
                onClick: () => {
                  navigate("/services/add");
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ServicesLayout;
