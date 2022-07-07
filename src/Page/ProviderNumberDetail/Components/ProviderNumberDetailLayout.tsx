import { Card, Col, Row, Space, Typography } from "antd";
import React, { FC } from "react";
import { ProviderType } from "../../../State/ActionTypes/ProvidersActionTypes";
import { ReactComponent as backSquareSvg } from "../../../Assets/BackSquare.svg";
import styles from "./ProviderNumberDetailLayout.module.scss";
import ButtonSide from "../../../Components/ButtonSide";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Status from "../../../Components/Status";

interface IProviderNumberDetailLayout {
  loading: boolean;
  data: ProviderType;
}

const { Text, Title } = Typography;

const ProviderNumberDetailLayout: FC<IProviderNumberDetailLayout> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  const RenderStatus: FC<{ status: number }> = ({ status }) => {
    switch (status) {
      case 0:
        return <Status type="error" text="Bỏ qua" />;
      case 1:
        return <Status type="waiting" text="Đang chờ" />;
      case 2:
        return <Status type="used" text="Đã sử dụng" />;
      default:
        return <Status type="error" text="Bỏ qua" />;
    }
  };

  return (
    <div className={styles.section}>
      <Title level={2} className={styles.title}>
        Quản lý cấp số
      </Title>
      <Row className={styles.detail}>
        <Col flex="auto">
          <Card bordered={false} style={{ height: "100%" }}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Title level={4} className={styles.title}>
                  Thông tin cấp số
                </Title>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size={16}>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Họ tên:</Text>
                    <Text className={styles.value}>{data.customerName}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Tên dịch vụ:</Text>
                    <Text className={styles.value}>{data.services.name}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Số thứ tự:</Text>
                    <Text className={styles.value}>{data.ordinalNumber}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Thời gian cấp:</Text>
                    <Text className={styles.value}>
                      {moment(data.dateProvider.toDate()).format(
                        "HH:mm - DD/MM/YYYY"
                      )}
                    </Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Hạn sử dụng:</Text>
                    <Text className={styles.value}>
                      {moment(data.dateValid.toDate()).format(
                        "HH:mm - DD/MM/YYYY"
                      )}
                    </Text>
                  </div>
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size={16}>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Nguồn cấp:</Text>
                    <Text className={styles.value}>
                      <RenderStatus status={data.status} />
                    </Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Trạng thái:</Text>
                    <Text className={styles.value}>{data.customerName}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Số điện thoại:</Text>
                    <Text className={styles.value}>{data.phoneNumber}</Text>
                  </div>
                  <div className={styles.contextContainer}>
                    <Text className={styles.label}>Địa chỉ Email:</Text>
                    <Text className={styles.value}>{data.email}</Text>
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col flex="100px">
          <ButtonSide
            content={[
              {
                label: "Quay lại",
                icon: backSquareSvg,
                onClick: () => {
                  navigate(`/provider/`);
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProviderNumberDetailLayout;
