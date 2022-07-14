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
import { ProviderType } from "../../../State/ActionTypes/ProvidersActionTypes";

interface IServiceDetailLayout {
  data: ServiceType;
  providerData: ProviderType[];
  providerLoading: boolean;
}

const { Title } = Typography;

const ServiceDetailLayout: FC<IServiceDetailLayout> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <Title className={styles.title} level={2}>
        Quản lý dịch vụ
      </Title>
      <Row wrap={false} style={{ height: "100%" }}>
        <Col flex="auto">
          <Row gutter={24} style={{ height: "100%" }}>
            <Col span={8}>
              <Detail data={props.data} />
            </Col>
            <Col span={16}>
              <FilterTable
                providerData={props.providerData}
                providerLoading={props.providerLoading}
              />
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
    </div>
  );
};

export default ServiceDetailLayout;
