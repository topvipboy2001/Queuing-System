import { Card, Input, Space, Typography } from "antd";
import React, { FC } from "react";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";
import styles from "./Detail.module.scss";

interface IDetail {
  data: ServiceType;
}

const { Text, Title } = Typography;

const Detail: FC<IDetail> = (props) => {
  const { data } = props;

  return (
    <Card className={styles.card}>
      <Space direction="vertical" size={12} className={styles.space}>
        <Title className={styles.title} level={4}>
          Thông tin dịch vụ
        </Title>
        <div className={styles.contextContainer}>
          <Text className={styles.label}>Mã dịch vụ:</Text>
          <Text className={styles.value}>{data.id}</Text>
        </div>
        <div className={styles.contextContainer}>
          <Text className={styles.label}>Tên dịch vụ:</Text>
          <Text className={styles.value}>{data.name}</Text>
        </div>

        {data.description && (
          <div className={styles.contextContainer}>
            <Text className={styles.label}>Mô tả:</Text>
            <Text className={styles.value}>{data.description}</Text>
          </div>
        )}
      </Space>
      <Space direction="vertical" size={12}>
        <Title className={styles.title} level={4}>
          Quy tắc cấp số
        </Title>
        {(data.increase.from || data.increase.to) && (
          <div className={styles.contextContainer}>
            <Text className={styles.label}>Mã dịch vụ:</Text>
            <Input
              className={styles.inputValue}
              readOnly
              value={data.increase.from}
              size="large"
            />
            <Text className={styles.value} style={{ margin: "8px" }}>
              đến
            </Text>
            <Input
              className={styles.inputValue}
              readOnly
              value={data.increase.to}
              size="large"
            />
          </div>
        )}

        {data.prefix && (
          <div className={styles.contextContainer}>
            <Text className={styles.label}>Prefix :</Text>
            <Input
              className={styles.inputValue}
              readOnly
              value={data.prefix}
              size="large"
            />
          </div>
        )}

        {data.surfix && (
          <div className={styles.contextContainer}>
            <Text className={styles.label}>Surfix :</Text>
            <Input
              className={styles.inputValue}
              readOnly
              value={data.surfix}
              size="large"
            />
          </div>
        )}

        {data.isReset && (
          <>
            <div className={styles.contextContainer}>
              <Text className={styles.label}>Reset mỗi ngày</Text>
            </div>
            <div className={styles.contextContainer}>
              <Text className={styles.valueIsReset}>Ví dụ: 201-2001</Text>
            </div>
          </>
        )}
      </Space>
    </Card>
  );
};

export default Detail;
