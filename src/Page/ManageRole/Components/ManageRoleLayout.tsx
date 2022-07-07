import { Col, Form, Row, Typography } from "antd";
import React, { FC } from "react";
import SearchInput from "../../../Components/SearchInput";
import { RoleType } from "../../../State/ActionTypes/RolesActionType";
import styles from "./ManageRoleLayout.module.scss";
import ManageRoleTable from "./ManageRoleTable";
import { ReactComponent as addSvg } from "../../../Assets/AddSquare.svg";
import ButtonSide from "../../../Components/ButtonSide";
import { useNavigate } from "react-router-dom";

interface IManageRoleLayout {
  loading: boolean;
  data: RoleType[];
}

const ManageRoleLayout: FC<IManageRoleLayout> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <Form layout="vertical">
        <Row justify="space-between" className={styles.inputContainer}>
          <Col>
            <Typography.Title level={2} className={styles.title}>
              Danh sách vai trò
            </Typography.Title>
          </Col>

          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Từ khóa</Typography.Text>}
            >
              <SearchInput size="large" placeholder="Nhập từ khóa" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <ManageRoleTable loading={props.loading} data={props.data} />
          </Col>
          <Col flex="100px">
            <ButtonSide
              content={[
                {
                  label: "Thêm vai trò",
                  icon: addSvg,
                  onClick: () => {
                    navigate("/setting/manage-roles/add");
                  },
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ManageRoleLayout;
