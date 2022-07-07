import { CaretDownOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Row, Select, Space, Typography } from "antd";
import React, { FC } from "react";
import ButtonSide from "../../../Components/ButtonSide";
import SearchInput from "../../../Components/SearchInput";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";
import styles from "./ServicesLayout.module.scss";
import ServicesTable from "./ServicesTable";
import { ReactComponent as addSvg } from "../../../Assets/AddSquare.svg";
import { useNavigate } from "react-router-dom";

interface IServicesLayout {
  loading: boolean;
  data: ServiceType[];
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
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Space size={24}>
              <Form.Item
                label={<Typography.Text strong>Từ khóa</Typography.Text>}
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={null}
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
              >
                <Form.Item noStyle>
                  <DatePicker size="large" />
                </Form.Item>
                <Form.Item noStyle>
                  <DatePicker size="large" />
                </Form.Item>
              </Form.Item>
            </Space>
          </Col>
          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
            >
              <SearchInput size="large" placeholder="Nhập từ khóa" />
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
