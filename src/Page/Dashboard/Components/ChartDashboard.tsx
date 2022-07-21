import React, { FC, useMemo } from "react";
import { Card, Col, Row, Select, Tag, Typography } from "antd";
import styles from "./ChartDashboard.module.scss";
import Icon, {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import Chart from "react-apexcharts";
import { ReactComponent as providerNumberSvg } from "../../../Assets/ProviderNumber.svg";
import { ReactComponent as providerNumberUsedSvg } from "../../../Assets/ProviderNumberUsed.svg";
import { ReactComponent as providerNumberWaitingSvg } from "../../../Assets/ProviderNumberWaiting.svg";
import { ReactComponent as providerNumberAbortSvg } from "../../../Assets/ProviderNumberAbort.svg";
import { ChartDataType } from "../../../State/ActionTypes/DashBoardType";
import { getDaysInMonth } from "../../../Utils/getTime";
import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";

interface IChartDashboard {
  chartData: ChartDataType;
  loading: boolean;
  chartType: string;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
  date: DayValue;
}

const { Title, Text } = Typography;

const ChartDashboard: FC<IChartDashboard> = (props) => {
  const chartLineData: ApexAxisChartSeries = useMemo(
    () => [
      {
        name: "Doanh Thu",
        data: props.chartData.providerChart,
      },
    ],
    [props.chartData]
  );

  const categories: Record<string, (string | number | null)[]> = {
    day: getDaysInMonth((props.date?.month || 6) + 1, props.date?.year || 2020),
    week: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  };

  const options: ApexCharts.ApexOptions = useMemo(() => {
    return {
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
        categories: categories[props.chartType],
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
        points: [
          {
            x: props.chartData.annotationsPoint.x,
            y: props.chartData.annotationsPoint.y,

            marker: {
              size: 12,
              fillColor: "#5185F7",
              strokeWidth: 6,
              strokeColor: "#fff",
            },
            label: {
              offsetY: -10,
              text: props.chartData.annotationsPoint?.value?.toString(),
              borderRadius: 8,
              borderColor: "#5185F7",
              style: {
                fontSize: "14px",
                fontWeight: 700,
                background: "#5185F7",
                color: "white",
                padding: {
                  top: 5,
                  bottom: 5,
                  left: 33,
                  right: 33,
                },
              },
            },
          },
        ],
      },
    };

    //eslint-disable-next-line
  }, [props.chartType, props.chartData]);

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
              <Text>{props.chartData.static.summary}</Text>
              <Tag
                className={styles.tag}
                icon={<ArrowUpOutlined />}
                color="#FF950126"
                style={{ color: "#FF9138" }}
              >
                32,41 %
              </Tag>
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
              <Text>{props.chartData.static.used}</Text>
              <Tag
                className={styles.tag}
                icon={<ArrowDownOutlined />}
                color="#E73F3F26"
                style={{ color: "#E73F3F" }}
              >
                32,41 %
              </Tag>
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
              <Text>{props.chartData.static.waiting}</Text>
              <Tag
                className={styles.tag}
                icon={<ArrowUpOutlined />}
                color="#FF950126"
                style={{ color: "#FF9138" }}
              >
                56,41 %
              </Tag>
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
              <Text>{props.chartData.static.reject}</Text>
              <Tag
                className={styles.tag}
                icon={<ArrowDownOutlined />}
                color="#E73F3F26"
                style={{ color: "#E73F3F" }}
              >
                22,41 %
              </Tag>
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
              value={props.chartType}
              onChange={props.setChartType}
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
