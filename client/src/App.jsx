import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import {
  HomeOutlined,
  PlusOutlined,
  CloseOutlined,
  EditOutlined,
  LogoutOutlined,
  GlobalOutlined

} from "@ant-design/icons";
import { getToken, removeToken } from "../auth/auth";

import HomePage from "./home";
import Login from "./login";
import Register from "./register";
import CompaniesPage from "./companiesNearMePage";
import DiscrepanciesPage from "./discrepancies";
import AdvertisingPage from "./advertising";
import MyCompaniesPage from "./myCompaniesPage";
import MyAdvertisingPage from "./myAdvertisingPage";
import UpdateMyProfile from "./updatemyprofile";
import Logout from "./logout";

import AddCompanyPage from "./components/add/addCompany";
import AddDiscrepanciesPage from './components/add/addDiscrepancy';
import AddPostingPage from './components/add/addPosting';
import AddAdvertisingPage from './components/add/addAdvertising';

import DeleteCompanyPage from "./components/delete/deleteCompany";
import DeleteDiscrepanciesPage from './components/delete/deleteDiscrepancy';
import DeletePostingPage from './components/delete/deletePosting';
import DeleteAdvertisingPage from './components/delete/deleteAdvertising';

import UpdateCompanyPage from "./components/update/updateCompany";
import UpdateDiscrepanciesPage from './components/update/updateDiscrepancy';
import UpdatePostingPage from './components/update/updatePosting';
import UpdateAdvertisingPage from './components/update/updateAdvertising';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
  };

  const menuItems = [
    { label: "Home", key: "1", icon: <HomeOutlined />, link: "/" },
    {
      label: "Connect",
      key: "submenu2",
      icon: <GlobalOutlined />,
      children: [
        { label: "Companies Near me", key: "6", link: "/companiesnearme" },
        { label: "Advertising Near Me", key: "7", link: "/advertisingnearme" },
      ],
    },
    {
      label: "Create",
      key: "submenu3",
      icon: <PlusOutlined />,
      children: [
        { label: "Add Companies", key: "8",  link: "/addcompanies" },
        { label: "Add Advertising", key: "9", link: "/addadvertising" },
        { label: "Add Posting", key: "10", link: "/addposting" },
        { label: "Add Discrepancies", key: "11", link: "/adddiscrepancies" },
      ],
    },
    {
      label: "Delete",
      key: "submenu4",
      icon: <CloseOutlined />,
      children: [
        { label: "Delete Companies", key: "12", link: "/deletecompanies" },
        { label: "Delete Advertising", key: "13", link: "/deleteadvertising" },
        { label: "Delete Posting", key: "14", link: "/deleteposting" },
        { label: "Delete Discrepancies", key: "15", link: "/deletediscrepancies" },
      ],
    },
    {
      label: "Update",
      key: "submenu5",
      icon: <EditOutlined />,
      children: [
        { label: "Update Companies", key: "16", link: "/updatecompanies" },
        { label: "Update Advertising", key: "17", link: "/updateadvertising" },
        { label: "Update Posting", key: "18", link: "/updateposting" },
        { label: "Update Discrepancies", key: "19", link: "/updatediscrepancies" },
      ],
    },
    { label: "Logout", key: "20", icon: <LogoutOutlined />, link: "/logout" },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderMenuItems = (items) =>
    items.map((item) =>
      item.children ? (
        <SubMenu key={item.key} icon={item.icon} title={item.label}>
          {renderMenuItems(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.link}>{item.label}</Link>
        </Menu.Item>
      )
    );

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {renderMenuItems(menuItems)}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "30px 32px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {loggedIn ? (
                <>
                  <Route path="/mycompanies" element={<MyCompaniesPage />} />
                  <Route path="/myadvertising" element={<MyAdvertisingPage />} />
                  <Route path="/discrepancies" element={<DiscrepanciesPage />} />
                  <Route path="/advertisingnearme" element={<AdvertisingPage />} />
                  <Route path="/companiesnearme" element={<CompaniesPage />} />
                  <Route path="/updatemyprofile" element={<UpdateMyProfile />} />
                  <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                  <Route path="/addcompanies" element={<AddCompanyPage />} />
                  <Route path="/addadvertising" element={<AddAdvertisingPage />} />
                  <Route path="/addposting" element={<AddPostingPage />} />
                  <Route path="/adddiscrepancies" element={<AddDiscrepanciesPage />} />
                  <Route path="/deletecompanies" element={<DeleteCompanyPage />} />
                  <Route path="/deleteadvertising" element={<DeleteAdvertisingPage />} />
                  <Route path="/deleteposting" element={<DeletePostingPage />} />
                  <Route path="/deletediscrepancies" element={<DeleteDiscrepanciesPage />} />
                  <Route path="/updatecompanies" element={<UpdateCompanyPage />} />
                  <Route path="/updateadvertising" element={<UpdateAdvertisingPage />} />
                  <Route path="/updateposting" element={<UpdatePostingPage />} />
                  <Route path="/updatediscrepancies" element={<UpdateDiscrepanciesPage />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
                  <Route path="/register" element={<Register />} />
                </>
              )}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
