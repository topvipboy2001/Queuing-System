import { CaretDownOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Row, Select, Space, Typography } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSide from "../../../Components/ButtonSide";
import SearchInput from "../../../Components/SearchInput";
import { ProviderType } from "../../../State/ActionTypes/ProvidersActionTypes";
import styles from "./ProviderNumberLayout.module.scss";
import ProviderNumberTable from "./ProviderNumberTable";
import { ReactComponent as addSvg } from "../../../Assets/AddSquare.svg";

interface IProviderNumberLayout {
  loading: boolean;
  data: ProviderType[];
}

const { Option } = Select;

const ProviderNumberLayout: FC<IProviderNumberLayout> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <Row>
        <Col>
          <Typography.Title level={2} className={styles.title}>
            Quản lý cấp số
          </Typography.Title>
        </Col>
      </Row>
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Space size={24}>
              <Form.Item
                label={<Typography.Text strong>Tên dịch vụ</Typography.Text>}
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={null}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ fontSize: "20px", color: "#FF7506" }}
                    />
                  }
                >
                  <Option value={null}>Tất cả</Option>
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Ngưng hoạt động </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={<Typography.Text strong>Tình trạng</Typography.Text>}
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={null}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ fontSize: "20px", color: "#FF7506" }}
                    />
                  }
                >
                  <Option value={null}>Tất cả</Option>
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Ngưng hoạt động </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={<Typography.Text strong>Nguồn cấp</Typography.Text>}
                className={styles.selectContianer}
              >
                <Select
                  size="large"
                  defaultValue={null}
                  suffixIcon={
                    <CaretDownOutlined
                      style={{ fontSize: "20px", color: "#FF7506" }}
                    />
                  }
                >
                  <Option value={null}>Tất cả</Option>
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Ngưng hoạt động </Option>
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
          <Col flex="240px">
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
          <ProviderNumberTable data={props.data} loading={props.loading} />
        </Col>
        <Col flex="100px">
          <ButtonSide
            content={[
              {
                label: "Cấp số mới",
                icon: addSvg,
                onClick: () => {
                  navigate("/provider/add");
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProviderNumberLayout;
