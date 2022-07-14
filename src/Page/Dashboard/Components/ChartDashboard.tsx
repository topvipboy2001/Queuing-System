import React, { FC } from "react";
import { Card, Col, Row, Select, Typography } from "antd";
import styles from "./ChartDashboard.module.scss";
import Icon, { CaretDownOutlined } from "@ant-design/icons";
import Chart from "react-apexcharts";
import { ReactComponent as providerNumberSvg } from "../../../Assets/ProviderNumber.svg";
import { ReactComponent as providerNumberUsedSvg } from "../../../Assets/ProviderNumberUsed.svg";
import { ReactComponent as providerNumberWaitingSvg } from "../../../Assets/ProviderNumberWaiting.svg";
import { ReactComponent as providerNumberAbortSvg } from "../../../Assets/ProviderNumberAbort.svg";
import { DashBoardType } from "../../../State/ActionTypes/DashBoardType";

interface IChartDashboard {
  data: DashBoardType;
  loading: boolean;
}

const { Title, Text } = Typography;

const categories: Record<string, string[]> = {
  week: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
  month: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
};

const chartLineData = [
  {
    name: "Doanh Thu",
    data: [1400, 2600, 2000, 1500, 2100, 1800, 1500],
  },
];

const options: ApexCharts.ApexOptions = {
  chart: {
    width: 100,
    toolbar: {
      show: false,
    },

    zoom: {
      enabled: false,
    },

    events: {
      mounted: (chart) => {
        chart.windowResizeHandler();
      },
    },
  },

  colors: ["#5185F7"],

  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 80, 100],
    },
  },

  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: categories["week"],
  },

  yaxis: {
    labels: {
      formatter: (value) => {
        const valueString = value.toString();
        return valueString;
      },
    },
  },

  responsive: [
    {
      breakpoint: 1000,
    },
  ],

  annotations: {
    points: [{}],
  },
};

const ChartDashboard: FC<IChartDashboard> = (props) => {
  return (
    <div className={styles.section}>
      <Title level={2} className={styles.title}>
        Biểu đồ cấp số
      </Title>
      <Row gutter={13} className={styles.providerNumberDataContainer}>
        <Col span={6}>
          <Card bodyStyle={{ padding: "7px 14px" }}>
            <div className={styles.providerNumberDataLabelContainer}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: "rgba(102, 149, 251, 0.15)" }}
              >
                <Icon component={providerNumberSvg} style={{ fontSize: 24 }} />
              </div>
              <div className={styles.providerNumberDataLabel}>
                <Text>Số thứ tự đã cấp</Text>
              </div>
            </div>
            <div className={styles.providerNumberDataValue}>
              <Text>{props.data.providers.summary}</Text>
              <div></div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ padding: "7px 14px" }}>
            <div className={styles.providerNumberDataLabelContainer}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: "rgba(53, 199, 90, 0.15)" }}
              >
                <Icon
                  component={providerNumberUsedSvg}
                  style={{ fontSize: 24 }}
                />
              </div>
              <div className={styles.providerNumberDataLabel}>
                <Text>Số thứ tự đã sử dụng</Text>
              </div>
            </div>
            <div className={styles.providerNumberDataValue}>
              <Text>{props.data.providers.used}</Text>
              <div></div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ padding: "7px 14px" }}>
            <div className={styles.providerNumberDataLabelContainer}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: "rgba(255, 172, 106, 0.15)" }}
              >
                <Icon
                  component={providerNumberWaitingSvg}
                  style={{ fontSize: 24 }}
                />
              </div>
              <div className={styles.providerNumberDataLabel}>
                <Text>Số thứ tự đang chờ</Text>
              </div>
            </div>
            <div className={styles.providerNumberDataValue}>
              <Text>{props.data.providers.waiting}</Text>
              <div></div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ padding: "7px 14px" }}>
            <div className={styles.providerNumberDataLabelContainer}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: "rgba(248, 109, 109, 0.15)" }}
              >
                <Icon
                  component={providerNumberAbortSvg}
                  style={{ fontSize: 24 }}
                />
              </div>
              <div className={styles.providerNumberDataLabel}>
                <Text>Số thứ tự đã bỏ qua</Text>
              </div>
            </div>
            <div className={styles.providerNumberDataValue}>
              <Text>{props.data.providers.reject}</Text>
              <div></div>
            </div>
          </Card>
        </Col>
      </Row>
      <Card
        className={styles.areaChartCard}
        bodyStyle={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <div className={styles.chartLabel}>
          <div className={styles.chartTitleContainer}>
            <Title className={styles.chartTitle} level={4}>
              Bảng thống kê theo tuần
            </Title>
            <Text className={styles.chartSubTitle}>Tháng 11/2021</Text>
          </div>
          <div>
            <Text className={styles.label}>Xem theo</Text>
            <Select
              size="large"
              defaultValue="week"
              className={styles.select}
              suffixIcon={
                <CaretDownOutlined
                  style={{ fontSize: "20px", color: "#FF7506" }}
                />
              }
            >
              <Select.Option value="week">Tuần</Select.Option>
              <Select.Option value="day">Ngày</Select.Option>
              <Select.Option value="month">Tháng</Select.Option>
            </Select>
          </div>
        </div>
        <div className={styles.chartContainer}>
          <Chart
            height="100%"
            width="99.9%"
            options={options}
            type="area"
            series={chartLineData}
          />
        </div>
      </Card>
    </div>
  );
};

export default ChartDashboard;
