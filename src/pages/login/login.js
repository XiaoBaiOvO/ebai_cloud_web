import {useEffect, useState} from "react";
import {Input, Button, Checkbox} from "antd";
import {useRequest} from "ahooks";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {apiLogin} from "../../api/api";
import {setUserName} from "../../redux/userSlice";
import styles from "./login.module.scss";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const Login = () => {
    const {userName} = useSelector(state => state.user);
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("Admin_123");
    const {loading, runAsync} = useRequest(apiLogin, {manual: true});
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
            userName?.length > 0 && navigate(location.state?.from ?? "/dashboard", {replace: true});
        }, [userName]
    );

    const handleClick = () => {
        runAsync({username, password}).then((response) => {
            dispatch(setUserName(response.currentAuthority));
            navigate(location.state?.from ?? "/dashboard", {replace: true});
        });
    }
    const currentYear = new Date().getFullYear();
    return (
        <section className={styles.layout}>
            <header className={styles.layout_header}>
                <span className={styles.header1}>iGUI </span>
                <span>业界最具影响力的 Web 网元管理产品</span>
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
                    <Button type="primary" className={styles.loginBtn} loading={loading}
                            onClick={handleClick}>登录</Button>
                </div>
            </main>
            <footer className={styles.layout_footer}>
                <a href=''>Pairba</a>
                <div>{`@${currentYear} 派尔吧科技上海有限公司出品`}</div>
            </footer>
        </section>
    );
};

export default Login;
