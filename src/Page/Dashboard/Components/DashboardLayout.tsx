import {
  DayRange,
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { Col, Row } from "antd";
import React, { FC } from "react";
import { DashBoardType } from "../../../State/ActionTypes/DashBoardType";
import ChartDashboard from "./ChartDashboard";
import styles from "./DashboardLayout.module.scss";
import Summary from "./Summary";

interface IDashboardLayout {
  date: DayValue;
  setDate: React.Dispatch<React.SetStateAction<DayValue>>;
  data: DashBoardType;
  loading: boolean;
}

const DashboardLayout: FC<IDashboardLayout> = (props) => {
  return (
    <Row className={styles.section}>
      <Col flex="auto">
        <ChartDashboard data={props.data} loading={props.loading} />
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
