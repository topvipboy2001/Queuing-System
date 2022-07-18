import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Form, FormInstance, Row, Select, Typography } from "antd";
import React, { FC } from "react";
import SearchInput from "../../../Components/SearchInput";
import {
  UserFilterType,
  UserType,
} from "../../../State/ActionTypes/UsersActionTypes";
import styles from "./ManageAccountLayout.module.scss";
import ManageAccountTable from "./ManageAccountTable";
import { ReactComponent as addSvg } from "../../../Assets/AddSquare.svg";
import ButtonSide from "../../../Components/ButtonSide";
import { useNavigate } from "react-router-dom";
import { RoleType } from "../../../State/ActionTypes/RolesActionType";

interface IManageAccountLayout {
  loading: boolean;
  data: UserType[];
  rolesLoading: boolean;
  rolesData: RoleType[];
  onFinish: (values: UserFilterType) => void;
  form: FormInstance;
}

const { Option } = Select;

const ManageAccountLayout: FC<IManageAccountLayout> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <Typography.Title level={2} className={styles.title}>
        Danh sách tài khoản
      </Typography.Title>
      <Form
        layout="vertical"
        name="filter-user"
        onFinish={props.onFinish}
        form={props.form}
      >
        <Row justify="space-between" className={styles.inputContainer}>
          <Col flex="300px">
            <Form.Item
              label={<Typography.Text strong>Tên vai trò</Typography.Text>}
              initialValue={null}
              name="role"
            >
              <Select
                onChange={() => props.form.submit()}
                size="large"
                suffixIcon={
                  <CaretDownOutlined
                    style={{ fontSize: "20px", color: "#FF7506" }}
                  />
                }
              >
                <Option value={null}>Tất cả</Option>
                {props.rolesData.map((value, index) => (
                  <Option key={index} value={value.id}>
                    {value.name}
                  </Option>
                ))}
              </Select>
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
      </Form>
      <Row>
        <Col flex="auto">
          <ManageAccountTable loading={props.loading} data={props.data} />
        </Col>
        <Col flex="100px">
          <ButtonSide
            content={[
              {
                label: "Thêm tài khoản",
                icon: addSvg,
                onClick: () => {
                  navigate("/setting/accounts/add");
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ManageAccountLayout;
