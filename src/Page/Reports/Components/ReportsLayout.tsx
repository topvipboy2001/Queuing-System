import { Col, Form, FormInstance, Row, Space, Typography } from "antd";
import React, { FC } from "react";
import ButtonSide from "../../../Components/ButtonSide";
import styles from "./ReportsLayout.module.scss";
import { ReactComponent as documentDownloadSvg } from "../../../Assets/DocumentDownload.svg";
import ReportsTable from "./ReportsTable";
import { ReportsType } from "../../../State/ActionTypes/ReportsActionTypes";
import { CSVLink } from "react-csv";
import DatePickerRange from "../../../Components/DatePickerRange";
interface IReportsLayout {
  loading: boolean;
  data: ReportsType[];
  onFinish: (values: any) => void;
  form: FormInstance<any>;
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

      <Form
        layout="vertical"
        name="report-filter"
        form={props.form}
        onFinish={props.onFinish}
      >
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Space size={24}>
              <Form.Item
                name="dateRange"
                label={<Typography.Text strong>Chọn thời gian</Typography.Text>}
              >
                <DatePickerRange onChange={() => props.form.submit()} />
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
