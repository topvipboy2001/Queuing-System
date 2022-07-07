import { Col, DatePicker, Form, Row, Space, Typography } from "antd";
import React, { FC } from "react";
import ButtonSide from "../../../Components/ButtonSide";
import styles from "./ReportsLayout.module.scss";
import { ReactComponent as addSvg } from "../../../Assets/AddSquare.svg";
import { useNavigate } from "react-router-dom";
import ReportsTable from "./ReportsTable";
import { ReportsType } from "../../../State/ActionTypes/ReportsActionTypes";

interface IReportsLayout {
  loading: boolean;
  data: ReportsType[];
}

const ReportsLayout: FC<IReportsLayout> = (props) => {
  const navigate = useNavigate();

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
          <ButtonSide
            content={[
              {
                label: "Cấp số mới",
                icon: addSvg,
                onClick: () => {
                  navigate("/provider/add");
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ReportsLayout;
