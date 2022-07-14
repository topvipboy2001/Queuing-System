import { Badge, Card, Progress, Space, Typography } from "antd";
import React, { FC } from "react";
import styles from "./Summary.module.scss";
import { Monitor } from "iconsax-react";
import {
  Calendar,
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { Link } from "react-router-dom";
import { DashBoardType } from "../../../State/ActionTypes/DashBoardType";
import { formatNumber } from "../../../Utils/formatNumber";
import { toPercent } from "../../../Utils/toPercent";

interface ISummary {
  date: DayValue;
  setDate: React.Dispatch<React.SetStateAction<DayValue>>;
  data: DashBoardType;
  loading: boolean;
}

const { Title, Text } = Typography;

const Summary: FC<ISummary> = (props) => {
  return (
    <Card className={styles.cardSection}>
      <Title level={2} className={styles.title}>
        Tổng quan
      </Title>

      <Space size={12} className={styles.cardContainer} direction="vertical">
        <Link to="/devices">
          <Card
            bordered={false}
            className={styles.cardContent}
            bodyStyle={{ padding: "12px 16px" }}
          >
            <Space>
              <div className={styles.progressContainer}>
                <Progress
                  type="circle"
                  percent={toPercent(
                    props.data.devices.summary,
                    props.data.devices.active
                  )}
                  width={60}
                  showInfo={false}
                  strokeColor="#FF7506"
                />
                <Progress
                  type="circle"
                  percent={toPercent(
                    props.data.devices.summary,
                    props.data.devices.notActive
                  )}
                  width={50}
                  className={styles.progress}
                  showInfo={false}
                  strokeColor="#7E7D88"
                />
                <Text className={styles.progressValue}>
                  {toPercent(
                    props.data.devices.summary,
                    props.data.devices.active
                  )}
                  %
                </Text>
              </div>
              <div className={styles.dataContainer}>
                <Text className={styles.dataValue}>
                  {formatNumber(props.data.devices.summary)}
                </Text>
                <div style={{ color: "#FF7506" }}>
                  <Monitor size={14} className={styles.dataLabelIcon} />
                  Thiết bị
                  <Text className={styles.dataLabel}></Text>
                </div>
              </div>
              <Space
                direction="vertical"
                className={styles.dataTypeContainer}
                size={5}
              >
                <div className={styles.dataTypeWrapper}>
                  <Badge
                    color="#FFD130"
                    style={{ width: "110px" }}
                    text={
                      <Text className={styles.dataTypeLabel}>
                        Đang hoạt động
                      </Text>
                    }
                  />
                  <Text
                    style={{ color: "#FF7506" }}
                    className={styles.dataTypeValue}
                  >
                    {props.data.devices.active}
                  </Text>
                </div>
                <div className={styles.dataTypeWrapper}>
                  <Badge
                    color="#7E7D88"
                    style={{ width: "110px" }}
                    text={
                      <Text className={styles.dataTypeLabel}>
                        Ngưng hoạt động
                      </Text>
                    }
                  />
                  <Text
                    style={{ color: "#FF7506" }}
                    className={styles.dataTypeValue}
                  >
                    {props.data.devices.notActive}
                  </Text>
                </div>
              </Space>
            </Space>
          </Card>
        </Link>

        <Link to="/services">
          <Card
            bordered={false}
            className={styles.cardContent}
            bodyStyle={{ padding: "12px 16px" }}
          >
            <Space>
              <div className={styles.progressContainer}>
                <Progress
                  type="circle"
                  percent={toPercent(
                    props.data.services.summary,
                    props.data.services.active
                  )}
                  width={60}
                  showInfo={false}
                  strokeColor="#4277FF"
                />
                <Progress
                  type="circle"
                  percent={toPercent(
                    props.data.services.summary,
                    props.data.services.notActive
                  )}
                  width={50}
                  className={styles.progress}
                  showInfo={false}
                  strokeColor="#7E7D88"
                />
                <Text className={styles.progressValue}>
                  {toPercent(
                    props.data.services.summary,
                    props.data.services.active
                  )}
                  %
                </Text>
              </div>

              <div className={styles.dataContainer}>
                <Text className={styles.dataValue}>
                  {props.data.services.summary}
                </Text>
                <div style={{ color: "#4277FF" }}>
                  <Monitor size={14} className={styles.dataLabelIcon} /> Dịch vụ
                  <Text className={styles.dataLabel}></Text>
                </div>
              </div>
              <Space
                direction="vertical"
                className={styles.dataTypeContainer}
                size={5}
              >
                <div className={styles.dataTypeWrapper}>
                  <Badge
                    color="#4277FF"
                    style={{ width: "110px" }}
                    text={
                      <Text className={styles.dataTypeLabel}>
                        Đang hoạt động
                      </Text>
                    }
                  />
                  <Text
                    style={{ color: "#4277FF" }}
                    className={styles.dataTypeValue}
                  >
                    {props.data.services.active}
                  </Text>
                </div>
                <div className={styles.dataTypeWrapper}>
                  <Badge
                    color="#7E7D88"
                    style={{ width: "110px" }}
                    text={
                      <Text className={styles.dataTypeLabel}>
                        Ngưng hoạt động
                      </Text>
                    }
                  />
                  <Text
                    style={{ color: "#4277FF" }}
                    className={styles.dataTypeValue}
                  >
                    {props.data.services.notActive}
                  </Text>
                </div>
              </Space>
            </Space>
          </Card>
        </Link>

        <Link to="/provider">
          <Card
            bordered={false}
            className={styles.cardContent}
            bodyStyle={{ padding: "12px 16px" }}
          >
            <Space>
              <div className={styles.progressContainer}>
                <Progress
                  type="circle"
                  percent={toPercent(
                    props.data.providers.summary,
                    props.data.providers.waiting
                  )}
                  width={60}
                  showInfo={false}
                  strokeColor="#35C75A"
                />
                <Progress
                  type="circle"
                  percent={toPercent(
                    props.data.providers.summary,
                    props.data.providers.used
                  )}
                  width={50}
                  className={styles.progress}
                  showInfo={false}
                  strokeColor="#7E7D88"
                />
                <Progress
                  type="circle"
                  percent={toPercent(
                    props.data.providers.summary,
                    props.data.providers.reject
                  )}
                  width={40}
                  className={styles.progress}
                  showInfo={false}
                  strokeColor="#F178B6"
                />
                <Text className={styles.progressValue}>
                  {toPercent(
                    props.data.providers.summary,
                    props.data.providers.waiting
                  )}
                  %
                </Text>
              </div>

              <div className={styles.dataContainer}>
                <Text className={styles.dataValue}>
                  {props.data.providers.summary}
                </Text>
                <div style={{ color: "#35C75A" }}>
                  <Monitor size={14} className={styles.dataLabelIcon} />
                  Cấp số
                  <Text className={styles.dataLabel}></Text>
                </div>
              </div>
              <Space
                direction="vertical"
                className={styles.dataTypeContainer}
                size={5}
              >
                <div className={styles.dataTypeWrapper}>
                  <Badge
                    color="#35C75A"
                    style={{ width: "110px" }}
                    text={
                      <Text className={styles.dataTypeLabel}>Đang chờ</Text>
                    }
                  />
                  <Text
                    style={{ color: "#35C75A" }}
                    className={styles.dataTypeValue}
                  >
                    {props.data.providers.waiting}
                  </Text>
                </div>
                <div className={styles.dataTypeWrapper}>
                  <Badge
                    color="#7E7D88"
                    style={{ width: "110px" }}
                    text={
                      <Text className={styles.dataTypeLabel}>Đã sử dụng</Text>
                    }
                  />
                  <Text
                    className={styles.dataTypeValue}
                    style={{ color: "#35C75A" }}
                  >
                    {props.data.providers.used}
                  </Text>
                </div>
                <div className={styles.dataTypeWrapper}>
                  <Badge
                    color="#F178B6"
                    style={{ width: "110px" }}
                    text={<Text className={styles.dataTypeLabel}>Bỏ qua</Text>}
                  />
                  <Text
                    style={{ color: "#35C75A" }}
                    className={styles.dataTypeValue}
                  >
                    {props.data.providers.reject}
                  </Text>
                </div>
              </Space>
            </Space>
          </Card>
        </Link>
        <Calendar value={props.date} onChange={props.setDate} />
      </Space>
    </Card>
  );
};

export default Summary;
