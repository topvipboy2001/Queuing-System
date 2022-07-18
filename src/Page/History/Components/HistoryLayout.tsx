import { Col, Form, FormInstance, Row, Typography } from "antd";
import React, { FC } from "react";
import DatePickerRange from "../../../Components/DatePickerRange";
import SearchInput from "../../../Components/SearchInput";
import {
  HistoryFilterType,
  HistoryType,
} from "../../../State/ActionTypes/HistoryActionTypes";
import styles from "./HistoryLayout.module.scss";
import HistoryTable from "./HistoryTable";

interface IHistoryLayout {
  loading: boolean;
  data: HistoryType[];
  form: FormInstance<any>;
  onFinish: (values: HistoryFilterType) => void;
}

const HistoryLayout: FC<IHistoryLayout> = (props) => {
  return (
    <div className={styles.section}>
      <Form
        layout="vertical"
        name="filter-history"
        form={props.form}
        onFinish={props.onFinish}
      >
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Form.Item
              label={<Typography.Text strong>Chọn thời gian </Typography.Text>}
              name="dateRange"
            >
              <DatePickerRange onChange={() => props.form.submit()} />
            </Form.Item>
          </Col>
          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
              name="search"
            >
              <SearchInput
                size="large"
                placeholder="Nhập từ khóa"
                onChange={() => props.form.submit()}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <HistoryTable data={props.data} loading={props.loading} />
          </Col>
          <Col flex="100px"></Col>
        </Row>
      </Form>
    </div>
  );
};

export default HistoryLayout;
