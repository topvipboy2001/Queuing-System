import { Button, Image, Menu, MenuProps } from "antd";
import Icon, { CommentOutlined, FileTextOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import styles from "./SiderContent.module.scss";
import logo from "../Assets/logo.svg";
import { ReactComponent as layerSvg } from "../Assets/layer-group.svg";
import { ReactComponent as moreSvg } from "../Assets/more-icon.svg";
import { ReactComponent as logoutSvg } from "../Assets/logout-icon.svg";
import { Element4, Monitor, Setting } from "iconsax-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOutAction } from "../State/Actions/LoginActions";

const items: MenuProps["items"] = [
  {
    label: (
      <>
        DashBoard
        <Link to="/" />
      </>
    ),
    key: "/",
    icon: <Element4 size={20} />,
  },
  {
    label: (
      <>
        Thiết bị
        <Link to="/devices" />
      </>
    ),

    key: "/devices",
    icon: <Monitor size={20} />,
  },
  {
    label: (
      <>
        Dịch Vụ
        <Link to="/services" />
      </>
    ),
    key: "/services",
    icon: <CommentOutlined style={{ fontSize: 20 }} />,
  },
  {
    label: (
      <>
        Cấp số
        <Link to="/provider" />
      </>
    ),
    key: "/provider",
    icon: <Icon component={layerSvg} style={{ fontSize: 20 }} />,
  },
  {
    label: (
      <>
        Báo cáo
        <Link to="/report" />
      </>
    ),
    key: "/report",
    icon: <FileTextOutlined style={{ fontSize: 20 }} />,
  },
  {
    label: "Cài đặt Hệ thống",

    key: "sub1",
    icon: <Setting size={20} />,
    expandIcon: <Icon component={moreSvg} className={styles.moreIcon} />,
    children: [
      {
        label: (
          <>
            Quản lý vai trò
            <Link to="/setting/manage-roles" />
          </>
        ),
        key: "/setting/manage-roles",
      },
      {
        label: (
          <>
            Quản lý tài khoản
            <Link to="/setting/accounts" />
          </>
        ),
        key: "/setting/accounts",
      },
      {
        label: (
          <>
            Nhật ký người dùng
            <Link to="/setting/user-history" />
          </>
        ),
        key: "/setting/user-history",
      },
    ],
  },
];

const authItems: MenuProps["items"] = [
  {
    label: <>Cấp số</>,
    key: "/provider",
    icon: <Icon component={layerSvg} style={{ fontSize: 20 }} />,
  },
];

const SiderContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = localStorage.getItem("userId");

  const handleLogout = async () => {
    dispatch(LogOutAction());
    navigate("/auth");
  };

  const selectedKey = useMemo(() => {
    const key = location.pathname.split("/");
    if (key[1] === "setting") {
      return ["/setting/" + key[2]];
    }

    return ["/" + key[1]];
  }, [location]);

  return (
    <div className={styles.siderWrapper}>
      <div>
        <div className={styles.imgWrapper}>
          <Link to="/" state={"1"}>
            <Image
              className={styles.img}
              height={64}
              width={80}
              preview={false}
              src={logo}
            />
          </Link>
        </div>
        <Menu selectedKeys={selectedKey} items={auth ? items : authItems} />
      </div>
      {auth ? (
        <Button
          className={styles.logoutBtn}
          icon={<Icon component={logoutSvg} style={{ marginRight: 12 }} />}
          type="link"
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      ) : null}
    </div>
  );
};

export default SiderContent;
