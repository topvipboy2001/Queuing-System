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
import ManageAccountAdd from "../Page/ManageAccountAdd";
import ManageAccountUpdate from "../Page/ManageAccountUpdate";
import ManageRole from "../Page/ManageRole";
import ManageRoleAdd from "../Page/ManageRoleAdd";
import ManagerRoleUpdate from "../Page/ManageRoleUpdate";
import ProviderNumber from "../Page/ProviderNumber";
import ProviderNumberAdd from "../Page/ProviderNumberAdd";
import ProviderNumberDetail from "../Page/ProviderNumberDetail";
import Reports from "../Page/Reports";
import ServiceAdd from "../Page/ServiceAdd";
import ServiceDetail from "../Page/ServiceDetail";
import Services from "../Page/Services";
import ServiceUpdate from "../Page/ServiceUpdate";
import RequireAuth from "./RequireAuth";

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
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/info"
              element={
                <RequireAuth>
                  <Info />
                </RequireAuth>
              }
            />
            <Route path="/devices">
              <Route
                index
                element={
                  <RequireAuth>
                    <Devices />
                  </RequireAuth>
                }
              />
              <Route
                path="add"
                element={
                  <RequireAuth>
                    <DeviceAdd />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:id"
                element={
                  <RequireAuth>
                    <DeviceUpdate />
                  </RequireAuth>
                }
              />
              <Route
                path=":id"
                element={
                  <RequireAuth>
                    <DeviceDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/services">
              <Route
                index
                element={
                  <RequireAuth>
                    <Services />
                  </RequireAuth>
                }
              />
              <Route
                path="add"
                element={
                  <RequireAuth>
                    <ServiceAdd />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:id"
                element={
                  <RequireAuth>
                    <ServiceUpdate />
                  </RequireAuth>
                }
              />
              <Route
                path=":id"
                element={
                  <RequireAuth>
                    <ServiceDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/provider">
              <Route
                index
                element={
                  <RequireAuth>
                    <ProviderNumber />
                  </RequireAuth>
                }
              />
              <Route path="add" element={<ProviderNumberAdd />} />
              <Route
                path=":id"
                element={
                  <RequireAuth>
                    <ProviderNumberDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="/report">
              <Route
                index
                element={
                  <RequireAuth>
                    <Reports />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="/setting">
              <Route path="accounts">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <ManageAccount />
                    </RequireAuth>
                  }
                />
                <Route
                  path="add"
                  element={
                    <RequireAuth>
                      <ManageAccountAdd />
                    </RequireAuth>
                  }
                />
                <Route
                  path="update/:id"
                  element={
                    <RequireAuth>
                      <ManageAccountUpdate />
                    </RequireAuth>
                  }
                />
              </Route>

              <Route path="manage-roles">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <ManageRole />
                    </RequireAuth>
                  }
                />
                <Route
                  path="add"
                  element={
                    <RequireAuth>
                      <ManageRoleAdd />
                    </RequireAuth>
                  }
                />
                <Route
                  path="update/:id"
                  element={
                    <RequireAuth>
                      <ManagerRoleUpdate />
                    </RequireAuth>
                  }
                />
              </Route>

              <Route
                path="user-history"
                element={
                  <RequireAuth>
                    <History />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContextRoute;
