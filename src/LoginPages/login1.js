import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined, } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import {Layout, message, Modal, Space, Spin, Tabs} from 'antd';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import MyFooter from "../CustomerPages/Commponents/MyFooter";
import {useRequest} from "ahooks";
import {currentUserRequest, loginRequest} from "../api";
import {useDispatch, useSelector} from "react-redux";
import {setUserId, setUserName, setUserAvatar, setUserData} from "../redux/userSlice";
import styles from "./login.module.scss";

const iconStyles = {
    marginInlineStart: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

export default () => {

    const [loginType, setLoginType] = useState('account');
    const navigate = useNavigate();
    const {userName, userId, userAvatar} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {loading, runAsync: doLogin} = useRequest(loginRequest, {manual: true});

    const {runAsync: doCurrentUser} = useRequest(currentUserRequest, {manual: true});

    useEffect(() => checkCurrentUser())
    const checkCurrentUser = () => {
        let secondsToGo = 3;
        const modal = Modal.success({
            title: '已登录',
            content: `页面将在 ${secondsToGo} 秒后跳转`,
            onOk() {
                navigate("/AdminPages")
            },
            okText: `知道了 ( ${secondsToGo} )`
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `页面将在 ${secondsToGo} 秒后跳转`,
                okText: `知道了 ( ${secondsToGo} )`
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            navigate("/AdminPages")
        }, secondsToGo * 1000);
    };

    const onFinish = (values) => {
        values.loginType = loginType
        doLogin(values)
            .then((response) => {
                if (response.code === 1) {
                    // Success
                    dispatch(setUserId(response.resultObject.userId))
                    dispatch(setUserName(response.resultObject.userName))
                    dispatch(setUserAvatar(response.resultObject.userAvatar))
                    // dispatch(setUserData(response.resultObject))
                    message.success(response.description).then(navigate("/AdminPages"))
                } else if (response.code === 99) {
                    // Fail
                    message.error(response.description).then()
                } else {
                    message.error("未知错误").then()
                }
            })
        return null;
    }


    return (
        <Spin spinning={false}>
        <Layout className={styles.loginLayout} style={{minHeight: document.documentElement.clientHeight - 1}}>
            <div style={{marginTop: 100}}>
                <LoginForm
                    logo={<img alt="logo" src="/public/logo.png" />}
                    title="小白云工作站"
                    subTitle="—— Ebai Cloud WorkStations ——"
                    onFinish={onFinish}
                    initialValues={{
                        autoLogin: true,
                    }}
                    actions={
                    <Space>
                        其他登录方式
                        <AlipayCircleOutlined style={iconStyles}/>
                        <TaobaoCircleOutlined style={iconStyles}/>
                        <WeiboCircleOutlined style={iconStyles}/>
                    </Space>}

                >
                    <Tabs centered activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
                        <Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
                        <Tabs.TabPane key={'phone'} tab={'手机号登录'}/>
                    </Tabs>
                    {loginType === 'account' && (<>
                        <ProFormText name="username" fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'}/>,
                        }} placeholder={'请输入用户名'} rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}/>
                        <ProFormText.Password name="password" fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'}/>,
                        }} placeholder={'请输入密码'} rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}/>
                    </>)}
                    {loginType === 'phone' && (<>
                        <ProFormText fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className={'prefixIcon'}/>,
                        }} name="mobile" placeholder={'手机号'} rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]}/>
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            captchaProps={{
                            size: 'large',
                        }} placeholder={'请输入验证码'} captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} 获取验证码`;
                            }
                            return '获取验证码';
                        }} name="captcha" rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]} onGetCaptcha={async () => {
                            message.success('获取验证码成功！验证码为：1234');
                        }}/>
                    </>)}
                    <div style={{
                        marginBlockEnd: 24,
                    }}>
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a style={{
                            float: 'right',
                        }}>
                            忘记密码
                        </a>
                    </div>
                </LoginForm>
            </div>
            <MyFooter/>
        </Layout>
        </Spin>);
};