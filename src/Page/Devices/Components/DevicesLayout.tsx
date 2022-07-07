import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Form, Row, Select, Space, Typography } from "antd";
import React, { FC } from "react";
import ButtonSide from "../../../Components/ButtonSide";
import SearchInput from "../../../Components/SearchInput";
import styles from "./DevicesLayout.module.scss";
import DevicesTable from "./DevicesTable";
import { ReactComponent as addSvg } from "../../../Assets/AddSquare.svg";
import { useNavigate } from "react-router-dom";
import { DeviceType } from "../../../State/ActionTypes/DevicesActionTypes";

interface IDevicesLayout {
  loading: boolean;
  data: DeviceType[];
}

const { Option } = Select;

const DevicesLayout: FC<IDevicesLayout> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <Row>
        <Col>
          <Typography.Title className={styles.title} level={2}>
            Danh sách thiết bị
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
                      style={{ fontSize: "20px", color: "#FF7506" }}
                    />
                  }
                >
                  <Option value={null}>Tất cả</Option>
                  <Option value={true}>Hoạt động</Option>
                  <Option value={false}>Ngưng hoạt động</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<Typography.Text strong>Từ khóa</Typography.Text>}
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
                  <Option value={false}>Mất kết nối</Option>
                </Select>
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
          <DevicesTable loading={props.loading} data={props.data} />
        </Col>
        <Col flex="100px">
          <ButtonSide
            content={[
              {
                label: "Thêm thiết bị",
                icon: addSvg,
                onClick: () => {
                  navigate("/devices/add");
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DevicesLayout;
