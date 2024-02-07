import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import HomePage from './home';
import Login from './login';
import Register from './register';
import CompaniesPage from './companiesPage';
import IndividualsPage from './individuals';
import DiscrepanciesPage from './discrepancies';
import PostingsPage from './postings';
import AdvertisingPage from './advertising';
import TransactionForm from './transactionForm';

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { label: 'Home', key: '1', icon: <PieChartOutlined />, link: '/' },
    { label: 'Login', key: '2', icon: <DesktopOutlined />, link: '/login' },
    { label: 'Register ', key: '3', icon: <DesktopOutlined />, link: '/register' },
    {
      label: 'My Profile',
      key: 'sub1',
      icon: <UserOutlined />,
      children: [
        { label: 'Transactions', key: '4', link: '/transactions' },
        { label: 'My Companies', key: '5', link: '/mycompanies' },
        { label: 'My Advertising', key: '6', link: '/myadvertising' },
        { label: 'My Posting', key: '7', link: '/mypostings' },

      ],
    },
    {
      label: 'Connect',
      key: 'sub2',
      icon: <UserOutlined />,
      children: [
        { label: 'Companies Near me', key: '8', link: '/companies' },
        { label: 'Advertising Near Me', key: '9', link: '/advertising' },

      ],
    },
  ];

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
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {renderMenuItems(menuItems)}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '30px 32px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/individuals" element={<IndividualsPage />} />
              <Route path="/discrepancies" element={<DiscrepanciesPage />} />
              <Route path="/postings" element={<PostingsPage />} />
              <Route path="/advertising" element={<AdvertisingPage />} />
              <Route path="/transactions" element={<TransactionForm />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
