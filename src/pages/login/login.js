import {useEffect, useState} from "react";
import {Input, Button, Checkbox} from "antd";
import {useRequest} from "ahooks";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {loginRequest, currentUserRequest} from "../../api";
import styles from "./login.module.scss";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const Login = () => {
    const {userName} = useSelector(state => state.user);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {

        }, [userName]
    );

    const handleClick = () => {

    }

    const currentYear = new Date().getFullYear();
    return (
        <section className={styles.layout}>
            <header className={styles.layout_header}>
                <span className={styles.header1}>小白云工作站</span>
                <span>Ebai Cloud Work Station</span>
            </header>
            <main className={styles.layout_content}>
                <div className={styles.login}>
                    <Input className={styles.username} prefix={<UserOutlined/>}
                           placeholder={"用户名"}
                           value={username} onChange={e => setUsername(e.target.value)}/>
                    <Input.Password className={styles.password} prefix={<LockOutlined/>}
                                    placeholder={"密码"}
                                    value={password} onChange={e => setPassword(e.target.value)}/>
                    <Checkbox className={styles.rememberMe}>记住登录信息</Checkbox>
                    <Button type="primary" className={styles.loginBtn}
                            // loading={loading}
                            onClick={handleClick}>登录</Button>
                </div>
            </main>
            <footer className={styles.layout_footer}>
                <a href=''>Daisy Huang & Xiaobai</a>
                <div>{`@${currentYear} 小白云工作站`}</div>
            </footer>
        </section>
    );
};

export default Login;
