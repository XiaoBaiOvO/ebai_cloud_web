import {useDispatch, useSelector} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button, Modal, Menu} from "antd";
import React, {useState} from "react";
import {useRequest} from "ahooks";
import {MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons";
// import * as Collection from "./collection/collection";
import Collection from "./collection/collection"

import {apiLogout} from "../api/api";
import {setUserName} from "../redux/userSlice";
import styles from "./main.module.scss";
// import {convertToArray, getAttrValue, getValueByJPath, removeNS} from "./common/commFunc";
// import {addEvent, setAlarms} from "../redux/faultSlice";
import {menu} from "../config/config";

const {SubMenu} = Menu;
const {confirm} = Modal;

const Main = () => {
    const {userName} = useSelector(state => state.user);
    // const [detect, setDetect] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [openKey, setOpenKey] = useState();
    const {loading, runAsync} = useRequest(apiLogout, {manual: true});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathname: from} = useLocation();
    // const {protocol, host} = window.location;
    // const websocket = useWebSocket(`ws${protocol === "http:" ? "" : "s"}:${host}/api/ws`, {
    //     manual: true,
    //     reconnectLimit: 0,
    //     onOpen: async () => {
    //         const response = await apiGetAlarms();
    //         if (response.result) {
    //             const allAlarms = {};
    //             // convertToArray(getValueByJPath(response.data, ["system", "alarms", "alarm", "state"])).forEach(alarm => {
    //             //     allAlarms[alarm.id] = alarm;
    //             // });
    //             dispatch(setAlarms(allAlarms));
    //         }
    //     },
    //     onMessage: event => {
    //         const message = JSON.parse(event.data).notification;
    //         const alarm_notification = message.notification?.['alarms-notification'];
    //         if (alarm_notification) {
    //             // dispatch(
    //             //     alarm_notification.delete ?
    //             //         clearAlarm(getValueByJPath(alarm_notification.delete, ['alarms', 'alarm', 'state'])) :
    //             //         addAlarm(getValueByJPath(alarm_notification.update, ['alarms', 'alarm', 'state'])));
    //         } else {
    //             const event = message.notification?.['event-notification']?.events;
    //             if (event) {
    //                 const obj = {
    //                     id: event.id,
    //                     resource: event.resource,
    //                     text: event.text,
    //                     'time-created': event['time-created'],
    //                     type: event['event-abbreviate'],
    //                     // severity: removeNS(getAttrValue(event, 'severity')),
    //                 }
    //                 dispatch(addEvent(obj));
    //             }
    //         }
    //     },
    //     onClose: () => {
    //         // console.log(event);
    //     },
    //     onError: () => {
    //         // console.log(event);
    //     }
    // });

    // useEffect(() => {
    //     if (userName === "" || userName == null) {
    //         detect ? confirm({
    //             content: <div>用户连接已中断，即将退回登录页面</div>,
    //             onOk: () => {
    //                 navigate("/login", {state: {from}});
    //             }
    //         }) : navigate("/login", {state: {from}});
    //         websocket.readyState === 1 && websocket.disconnect();
    //     } else {
    //         setDetect(true);
    //         websocket.readyState === 3 && websocket.connect();
    //     }
    // }, [userName]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleClick = () => {
        confirm({
            content: <div>是否退出用户？</div>,
            onOk: () => {
                // setDetect(false);
                runAsync().then(() => {
                    dispatch(setUserName(""));
                    navigate("/login");
                });
            }
        });
    };

    const handleMenuClick = e => {
        navigate(`/${e.key}`);
    };

    return (
        // <section className={styles.container}>
        //     <header className={styles.header}>
        //         <Button type="primary" onClick={toggleCollapsed}>
        //             {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        //         </Button>
        //         <h1>iGUI - Pairba</h1>
        //         <div className={styles.header_space}/>
        //         <span>{`用户名：${userName} `}</span>
        //         <Button type="primary" loading={loading} onClick={handleClick}>Logout</Button>
        //     </header>
        //     <section className={styles.content}>
        //         <aside className="aside">
        //             <Menu mode="inline" onClick={handleMenuClick} defaultOpenKeys={[openKey]}
        //                   defaultSelectedKeys={[from.replace("/", "")]}
        //                   inlineCollapsed={collapsed}>
        //                 {menu.map(item =>
        //                     item.child ?
        //                         <SubMenu key={item.key} icon={item.icon} title={item.name}>
        //                             {item.child.map(subItem => {
        //                                 (from === `/${subItem.key}` && openKey == null) && setOpenKey(item.key);
        //                                 return <Menu.Item key={subItem.key}>{subItem.name}</Menu.Item>
        //                             })}
        //                         </SubMenu> :
        //                         <Menu.Item key={item.key} icon={item.icon}>{item.name}</Menu.Item>
        //                 )}
        //             </Menu>
        //         </aside>
        //         <main className={styles.main}>
        //             {<Outlet/>}
        //         </main>
        //     </section>
        //     <footer className={styles.footer}>
        //         {`@Copyright by Pairba, ${new Date().getFullYear()}`}
        //     </footer>
        // </section>
        <main className={styles.main}>
            <Collection/>
        </main>
    );
};

export default Main;
