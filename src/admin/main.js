import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {
    Avatar,
    Breadcrumb,
    Button,
    Layout,
    Menu, message, Modal,
    Space
} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons';
import {menu} from "../config/config";
import MyFooter from "../pages/Commponents/MyFooter";
import {useSelector} from "react-redux";

const { Header, Content, Sider } = Layout;

export default () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {userName} = useSelector(state => state.user);

    useEffect(() => {
        if (document.documentElement.clientWidth < 1000) {
            setIsModalOpen(true)
            setCollapsed(true)
        }
    }, [])

    const onClick = (e) => {
        navigate(e.key);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout style={{minHeight: document.documentElement.clientHeight - 1}}>
            <Modal
                title="温馨提醒"
                open={isModalOpen}
                onOk={closeModal}
                onCancel={closeModal}
                footer={[<Button onClick={closeModal}>坚持访问</Button>,
                    <Button type="primary" onClick={() => {navigate("/")}}>返回首页</Button>
                ]}>
                <p>检测到浏览器宽度过窄</p>
                <p>管理页面暂不支持低分辨率设备访问</p>
                <p>请使用电脑登录</p>
            </Modal>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    color: "white"
                }}>
                <img alt="logo" src="/logo.png" width={40} style={{marginLeft: -30}}/>
                <span style={{fontSize: 18, marginLeft: 10}}>小白云工作站</span>
                <Space style={{position: "absolute", right: 20}}>
                    <Button ghost onClick={() => {navigate("/")}}>返回首页</Button>
                    <Avatar
                        style={{ backgroundColor: '#fff', marginTop: -3}}
                        // icon={<UserOutlined />}
                        src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                    />
                    <span>{userName}</span>
                </Space>
            </Header>
            <Layout>
                <Sider
                    style={{backgroundColor: "white"}}
                    width={200}
                    trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    theme="light"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={() => setCollapsed(!collapsed)}
                >
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['home']}
                        defaultSelectedKeys={['']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={menu}
                        onClick={onClick}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>控制台</Breadcrumb.Item>
                        {location.pathname.split("/")
                            .map((value, index) => index === 0 || index === 1 ? null :
                                <Breadcrumb.Item key={index}>{value}</Breadcrumb.Item>)}
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {<Outlet/>}
                    </Content>
                    <MyFooter/>
                </Layout>
            </Layout>
        </Layout>
    );
};

