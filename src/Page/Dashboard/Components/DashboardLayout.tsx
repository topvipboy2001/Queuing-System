import { Col, Row } from "antd";
import React from "react";
import ChartDashboard from "./ChartDashboard";
import styles from "./DashboardLayout.module.scss";
import Summary from "./Summary";

const DashboardLayout = () => {
  return (
    <Row className={styles.section}>
      <Col flex="auto">
        <ChartDashboard />
      </Col>
      <Col flex="400px">
        <Summary />
      </Col>
    </Row>
  );
};

export default DashboardLayout;
