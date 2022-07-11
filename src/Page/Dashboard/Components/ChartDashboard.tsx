import React from "react";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import styles from "./ChartDashboard.module.scss";
import Icon from "@ant-design/icons";
import Chart from "react-apexcharts";
import { ReactComponent as providerNumberSvg } from "../../../Assets/ProviderNumber.svg";
import { ReactComponent as providerNumberUsedSvg } from "../../../Assets/ProviderNumberUsed.svg";
import { ReactComponent as providerNumberWaitingSvg } from "../../../Assets/ProviderNumberWaiting.svg";
import { ReactComponent as providerNumberAbortSvg } from "../../../Assets/ProviderNumberAbort.svg";

const { Title, Text } = Typography;

const chartLineData = [
  {
    name: "Doanh Thu",
    data: [
      140000000, 260000000, 200000000, 150000000, 210000000, 180000000,
      150000000,
    ],
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

  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
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

const ChartDashboard = () => {
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
              <Text>4.221</Text>
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
              <Text>3.721</Text>
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
              <Text>468</Text>
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
              <Text>32</Text>
              <div></div>
            </div>
          </Card>
        </Col>
      </Row>
      <Card className={styles.areaChartCard} bodyStyle={{ height: "100%" }}>
        <div style={{ height: "100%", width: "100%" }}>
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
