import {
    AlertOutlined,
    BarChartOutlined,
    BranchesOutlined,
    DashboardOutlined,
    DeploymentUnitOutlined,
    HddOutlined, RocketOutlined
} from "@ant-design/icons";

import Login from "../pages/login/login";
import Main from "../pages/main";
import React from "react";


export const routes = [
    {path: "/login", element: <Login/>}, {
        path: "/", element: <Main/>,
        children: [
            {index: true, element: <h1 style={{color: "blue"}}>Index</h1>},
            {path: "dashboard", element: <h1 style={{color: "green"}}>Dashboard</h1>},
            {path: "*", element: <h1 style={{color: "red"}}>Bad Link</h1>}
        ]
    }
];

export const menu = [
    {name: "仪表盘", key: "dashboard", icon: <DashboardOutlined/>},
    {
        name: "告警和事件", key: "fault", icon: <AlertOutlined/>, child: [
            {name: "告警管理", key: "alarm"},
            {name: "事件查看", key: "event"}
        ]
    },
    {
        name: "性能管理", key: "performance", icon: <BarChartOutlined/>, child: [
            {name: "监控点管理", key: "pmp"},
            {name: "阈值穿越警报", key: "tca"},
            {name: "性能管理", key: "pm"}
        ]
    },
    {name: "业务管理", key: "service", icon: <BranchesOutlined/>},
    {name: "系统管理", key: "system", icon: <HddOutlined/>},
    {name: "LLDP", key: "lldp", icon: <DeploymentUnitOutlined/>},
    {name: "系统操作", key: "operation", icon: <RocketOutlined/>},
    {name: "源数据", key: "originalData", icon: <RocketOutlined/>},
];
