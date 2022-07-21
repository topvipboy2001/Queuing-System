import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import { Col, Row } from "antd";
import React, { FC } from "react";
import {
  ChartDataType,
  DashBoardType,
} from "../../../State/ActionTypes/DashBoardType";
import ChartDashboard from "./ChartDashboard";
import styles from "./DashboardLayout.module.scss";
import Summary from "./Summary";

interface IDashboardLayout {
  date: DayValue;
  setDate: React.Dispatch<React.SetStateAction<DayValue>>;
  data: DashBoardType;
  chartData: ChartDataType;
  loading: boolean;
  chartType: string;
  setChartType: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardLayout: FC<IDashboardLayout> = (props) => {
  return (
    <Row className={styles.section}>
      <Col flex="auto">
        <ChartDashboard
          date={props.date}
          chartData={props.chartData}
          loading={props.loading}
          chartType={props.chartType}
          setChartType={props.setChartType}
        />
      </Col>
      <Col flex="400px">
        <Summary
          setDate={props.setDate}
          date={props.date}
          data={props.data}
          loading={props.loading}
        />
      </Col>
    </Row>
  );
};

export default DashboardLayout;
