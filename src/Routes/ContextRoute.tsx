import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import HeaderContent from "../Layout/HeaderContent";
import SiderContent from "../Layout/SiderContent";
import Dashboard from "../Page/Dashboard";
import DeviceAdd from "../Page/DeviceAdd";
import DeviceDetail from "../Page/DeviceDetail";
import Devices from "../Page/Devices";
import DeviceUpdate from "../Page/DeviceUpdate";
import History from "../Page/History";
import Info from "../Page/Info";
import ManageAccount from "../Page/ManageAccount/Index";
import ManageRole from "../Page/ManageRole";
import ProviderNumber from "../Page/ProviderNumber";
import Services from "../Page/Services";

const { Sider, Content, Header } = Layout;

const ContextRoute = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={266}>
        <SiderContent />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "transparent" }}>
          <HeaderContent />
        </Header>
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/info" element={<Info />} />

            <Route path="/devices">
              <Route index element={<Devices />} />
              <Route path="add" element={<DeviceAdd />} />
              <Route path="update/:id" element={<DeviceUpdate />} />
              <Route path=":id" element={<DeviceDetail />} />
            </Route>

            <Route path="/services">
              <Route index element={<Services />} />
            </Route>

            <Route path="/provider">
              <Route index element={<ProviderNumber />} />
            </Route>

            <Route path="/setting">
              <Route path="accounts" element={<ManageAccount />} />
              <Route path="manage-roles" element={<ManageRole />} />
              <Route path="user-history" element={<History />} />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContextRoute;