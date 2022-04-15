import React, { useState } from 'react';
import styles from './index.less';
import { Layout, Menu, Image, Affix } from 'antd';
import logo from '../assets/images/logo.png';
import { router } from 'umi';
import {
  MenuOutlined,
  ShoppingCartOutlined,
  PieChartOutlined,
  HomeOutlined,
  TagsOutlined,
  ReconciliationOutlined,
  InboxOutlined,
  FileDoneOutlined,
  TeamOutlined,
  DropboxOutlined,
} from '@ant-design/icons';
import Header from '../components/Header';
const { Sider, Content } = Layout;
function BasicLayout(props) {
  const { children } = props;
  const [Collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Affix offsetTop={1}>
      <Sider
        className={styles.containerSlider}
        trigger={null}
        collapsible
        collapsed={Collapsed}
        width={300}
      >
         
        <Image className={styles.logo} width={270} src={logo} preview={false} />
        <Menu
          className={styles.menu}
          mode="inline"
          defaultSelectedKeys={['1']}
          inlineCollapsed={Collapsed}
        >
          <Menu.Item
            className={styles.menuItems}
            key="1"
            icon={<MenuOutlined className={styles.menuIcons} />}
            onClick={() => setCollapsed(!Collapsed)}
          ></Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="2"
            icon={<HomeOutlined className={styles.menuIcons} />}
            onClick={() => router.push('/dashboard')}
          >
            <span className={styles.menuTitle}>Tổng Quan</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="3"
            icon={<InboxOutlined className={styles.menuIcons} />}
            onClick={() => router.push('/product')}
          >
            <span className={styles.menuTitle}>Sản Phẩm</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="4"
            icon={<FileDoneOutlined className={styles.menuIcons} />}
            onClick={() => router.push('/category')}
          >
            <span className={styles.menuTitle}>Phân Loại</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="5"
            icon={<DropboxOutlined className={styles.menuIcons} />}
            
          >
            <span className={styles.menuTitle}>Thương Hiệu</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="6"
            icon={<ShoppingCartOutlined className={styles.menuIcons} />}
          >
            <span className={styles.menuTitle}>Đơn Hàng</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="7"
            icon={<ReconciliationOutlined className={styles.menuIcons} />}
            onClick={() => router.push('/import')}
          >
            <span className={styles.menuTitle}>Nhập Hàng</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="8"
            icon={<TagsOutlined className={styles.menuIcons} />}
          >
            <span className={styles.menuTitle}>Khuyến Mại</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="9"
            icon={<TeamOutlined className={styles.menuIcons} />}
          >
            <span className={styles.menuTitle}>Khách Hàng</span>
          </Menu.Item>
          <Menu.Item
            className={styles.menuItems}
            key="10"
            icon={<PieChartOutlined className={styles.menuIcons} />}
            onClick={() => router.push('/report')}
          >
            <span className={styles.menuTitle}>Báo Cáo</span>
          </Menu.Item>
        </Menu>
        
      </Sider>
      </Affix>
      <Layout>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
