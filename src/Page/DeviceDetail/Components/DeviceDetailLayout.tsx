import { Card, Col, Row, Space, Typography } from "antd";
import React from "react";
import ButtonSide from "../../../Components/ButtonSide";
import styles from "./DeviceDetailLayout.module.scss";
import { ReactComponent as editSvg } from "../../../Assets/Edit.svg";
import { useNavigate } from "react-router-dom";
import { DeviceType } from "../../../State/ActionTypes/DevicesActionTypes";

interface IDeviceDetailLayout {
  loading: boolean;
  data: DeviceType;
}

const { Text, Title } = Typography;

const DeviceDetailLayout: React.FC<IDeviceDetailLayout> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  const RenderService = () => {
    const services = data.services.map((item) => item.name).join(", ") + ".";

    return (
      <div
        className={styles.contextContainer}
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <Text className={styles.label} style={{ marginBottom: "8px" }}>
          Dịch vụ sử dụng:
        </Text>
        <Text className={styles.value}>{services}</Text>
      </div>
    );
  };

  return (
    <div className={styles.section}>
      <Title level={2} className={styles.title}>
        Quản lý thiết bị
      </Title>
      <Row className={styles.detail}>
        <Col flex="auto">
          <Card bordered={false} style={{ height: "100%" }}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Title level={4} className={styles.title}>
                  Thông tin thiết bị
                </Title>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size={16}>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Mã thiết bị:</Text>
                    <Text className={styles.value}>{data.id}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Tên thiết bị:</Text>
                    <Text className={styles.value}>{data.name}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Địa chỉ IP:</Text>
                    <Text className={styles.value}>{data.IPAddress}</Text>
                  </div>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size={16}>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Loại thiết bị:</Text>
                    <Text className={styles.value}>{data.deviceType.name}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Tên đăng nhập:</Text>
                    <Text className={styles.value}>{data.username}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Mật khẩu:</Text>
                    <Text className={styles.value}>{data.password}</Text>
                  </div>
                </Space>
              </Col>
              <Col span={24}>
                <div className={styles.contextContainer}>
                  <RenderService />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col flex="100px">
          <ButtonSide
            content={[
              {
                label: "Cập nhật thiết bị",
                icon: editSvg,
                onClick: () => {
                  navigate(`/devices/update/${data.id}`);
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DeviceDetailLayout;
