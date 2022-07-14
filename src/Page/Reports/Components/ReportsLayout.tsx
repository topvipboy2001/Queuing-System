import { Col, DatePicker, Form, Row, Space, Typography } from "antd";
import React, { FC } from "react";
import ButtonSide from "../../../Components/ButtonSide";
import styles from "./ReportsLayout.module.scss";
import { ReactComponent as documentDownloadSvg } from "../../../Assets/DocumentDownload.svg";
import ReportsTable from "./ReportsTable";
import { ReportsType } from "../../../State/ActionTypes/ReportsActionTypes";
import { CSVLink } from "react-csv";
interface IReportsLayout {
  loading: boolean;
  data: ReportsType[];
}

const ReportsLayout: FC<IReportsLayout> = (props) => {
  return (
    <div className={styles.section}>
      <Row>
        <Col>
          <Typography.Title level={2} className={styles.title}>
            Quản lý cấp số
          </Typography.Title>
        </Col>
      </Row>

      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Space size={24}>
              <Form.Item
                label={<Typography.Text strong>Chọn thời gian</Typography.Text>}
              >
                <Form.Item noStyle>
                  <DatePicker size="large" />
                </Form.Item>
                <Form.Item noStyle>
                  <DatePicker size="large" />
                </Form.Item>
              </Form.Item>
            </Space>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col flex="auto">
          <ReportsTable data={props.data} loading={props.loading} />
        </Col>
        <Col flex="100px">
          <CSVLink data={props.data} filename="report.csv">
            <ButtonSide
              content={[
                {
                  label: "Tải về",
                  icon: documentDownloadSvg,
                },
              ]}
            />
          </CSVLink>
        </Col>
      </Row>
    </div>
  );
};

export default ReportsLayout;
