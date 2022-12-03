import React from "react";
// 图标
import {
    DashboardOutlined,
    DeliveredProcedureOutlined,
    HomeOutlined,
    InboxOutlined,
    ProfileOutlined,
} from "@ant-design/icons";

// 首页
import Pages from "../CustomerPages/main";

// 登录
import Login from "../LoginPages/login1";

// 管理页面
import Admin from "../AdminPages/main"

import Home from "../AdminPages/Home"
import Dashboard from "../AdminPages/Dashboard"
import CollectionDetail from "../AdminPages/CollectionDetail"
import CollectionReport from "../AdminPages/CollectionReport"
import Result404 from "../CustomerPages/Result/404"

// 路由表
export const routes = [
    {
        path: "/LoginPages",
        element: <Login/>,
    },
    {
        path: "/AdminPages",
        element: <Admin/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>
            },
            {
                path: "collectionDetail",
                element: <CollectionDetail/>
            },
            {
                path: "collectionReport",
                element: <CollectionReport/>
            },
            {
                path: "*",
                element: <Result404/>
            }
        ]
    },
    {
        path: "/",
        element: <Pages/>,
    },
    {
        path: "*",
        element: <Result404/>,
    }
];

// 菜单栏
export const menu = [
    {
        key: "home",
        icon: <HomeOutlined/>,
        label: "主页",
        children: [
            {
                key: "",
                label: "主页",
            },
            {
                key: "dashboard",
                label: "Dashboard",
                icon: <DashboardOutlined/>,
            }
        ]
    },
    {
        key: "collection",
        icon: <InboxOutlined />,
        label: "表单收集",
        children: [
            {
                key: "collectionDetail",
                label: "收集情况查询",
                icon: <ProfileOutlined />,
            },
            {
                key: "collectionReport",
                label: "汇总报告",
                icon: <DeliveredProcedureOutlined />,
            }
        ]
    },
]
