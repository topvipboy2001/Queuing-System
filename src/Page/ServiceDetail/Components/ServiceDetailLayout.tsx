import { Col, Row, Typography } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSide from "../../../Components/ButtonSide";
import { ServiceType } from "../../../State/ActionTypes/ServicesActionTypes";
import Detail from "./Detail";
import FilterTable from "./FilterTable";
import styles from "./ServiceDetailLayout.module.scss";
import { ReactComponent as backSvg } from "../../../Assets/BackSquare.svg";
import { ReactComponent as editSvg } from "../../../Assets/Edit.svg";

interface IServiceDetailLayout {
  data: ServiceType;
}

const { Title } = Typography;

const ServiceDetailLayout: FC<IServiceDetailLayout> = (props) => {
  const navigate = useNavigate();

  return (
    <Row className={styles.section}>
      <Col span={24}>
        <Title className={styles.title} level={2}>
          Quản lý dịch vụ
        </Title>
      </Col>
      <Col flex="auto">
        <Row>
          <Col flex="auto">
            <Row gutter={24}>
              <Col span={8}>
                <Detail data={props.data} />
              </Col>
              <Col span={16}>
                <FilterTable />
              </Col>
            </Row>
          </Col>
          <Col flex="100px">
            <ButtonSide
              content={[
                {
                  label: "Cập nhật danh sách",
                  icon: editSvg,
                  onClick: () => {
                    navigate("/services/add");
                  },
                },
                {
                  label: "Quay lại",
                  icon: backSvg,
                  onClick: () => {
                    navigate("/services");
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ServiceDetailLayout;
