import { Avatar, Breadcrumb, Image, Typography } from "antd";
import React, { Fragment, useEffect, useMemo } from "react";
import styles from "./HeaderContent.module.scss";
import avatar from "../Assets/avatar.svg";
import { Link, useLocation } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import useBreadcrumbs, { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import NotificationButton from "./NotificationButton";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../State/Store";
import { providerGetForNotificationAction } from "../State/Actions/ProvidersActions";

const { Text } = Typography;

const routes: BreadcrumbsRoute[] = [
  { path: "/devices", breadcrumb: "Danh sách thiết bị", props: { root: true } },
  { path: "/devices/add", breadcrumb: "Thêm thiết bị" },
  { path: "/devices/:id", breadcrumb: "Chi tiết thiết bị" },
  { path: "/devices/update/:id", breadcrumb: "Cập nhật thiết bị" },
  {
    path: "/services",
    breadcrumb: "Danh sách dịch vụ ",
    props: { root: true },
  },
  {
    path: "/services/add",
    breadcrumb: "Thêm dịch vụ ",
  },
  {
    path: "/services/:id",
    breadcrumb: "Chi tiết ",
  },
  {
    path: "/services/update/:id",
    breadcrumb: "Cập nhật",
  },
  { path: "/provider", breadcrumb: "Danh sách cấp số", props: { root: true } },
  { path: "/provider/add", breadcrumb: "Cấp số mới" },
  { path: "/provider/:id", breadcrumb: "Chi tiết" },

  { path: "/report", breadcrumb: "Lập báo cáo", props: { root: true } },

  {
    path: "/setting",
    breadcrumb: "Cài đặt hệ thống",
    props: { isNotLink: true },
  },
  { path: "/setting/manage-roles", breadcrumb: "Quản lý vai trò" },
  { path: "/setting/manage-roles/add", breadcrumb: "Thêm vai trò" },
  { path: "/setting/manage-roles/update/:id", breadcrumb: "Cập nhật vai trò" },

  { path: "/setting/accounts", breadcrumb: "Quản lý tài khoản" },
  { path: "/setting/accounts/add", breadcrumb: "Thêm tài khoản" },
  { path: "/setting/accounts/update/:id", breadcrumb: "Cập nhật tài khoản" },
  { path: "/setting/user-history", breadcrumb: "Nhật ký người dùng" },
];

const breadcrumbNameMap: Record<string, string> = {
  "/devicesF": "Thiết bị",
  "/servicesF": "Dịch vụ",
  "/providerF": "Cấp số",
  "/reportF": "Báo cáo",
};

const HeaderContent = () => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });
  const providerState = useSelector((state: RootStore) => state.providers);
  const dispatch = useDispatch();
  const auth = localStorage.getItem("userId");

  useEffect(() => {
    try {
      dispatch(providerGetForNotificationAction());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const extraBreadcrumbItems = breadcrumbs.map(
    ({ match, breadcrumb }, index) => {
      if (match.route?.props?.root) {
        return (
          <Fragment key={index}>
            <Breadcrumb.Item>
              <Link to={match.pathname}>
                {breadcrumbNameMap[match.pathname + "F"]}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={match.pathname}>{breadcrumb}</Link>
            </Breadcrumb.Item>
          </Fragment>
        );
      }

      if (match.route?.props?.isNotLink) {
        return (
          <Breadcrumb.Item key={match.pathname}>{breadcrumb}</Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={match.pathname}>
          <Link to={match.pathname}>{breadcrumb}</Link>
        </Breadcrumb.Item>
      );
    }
  );

  const breadcrumbItems = useMemo(
    () =>
      location.pathname === "/"
        ? [
            <Breadcrumb.Item key="home">
              <Link to="/">Dashboard</Link>
            </Breadcrumb.Item>,
          ]
        : extraBreadcrumbItems,
    [location, extraBreadcrumbItems]
  );

  return (
    <div className={styles.headerWrapper}>
      <div>
        <Breadcrumb separator={<RightOutlined />}>{breadcrumbItems}</Breadcrumb>
      </div>
      {auth ? (
        <div className={styles.avatarContainer}>
          <NotificationButton
            providerNumberData={providerState.notificationCurrent}
          />
          <Link to="/info" className={styles.infoContainer}>
            <Avatar size={40} src={<Image src={avatar} preview={false} />} />
            <div className={styles.nameContainer}>
              <Text className={styles.hello}>Xin chào</Text>
              <Text className={styles.name}>
                {localStorage.getItem("name")}
              </Text>
            </div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderContent;
