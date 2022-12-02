import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined, } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import {Layout, message, Space, Tabs} from 'antd';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import MyFooter from "../Commponents/MyFooter";

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

    return (
        <Layout style={{minHeight: document.documentElement.clientHeight - 1}}>
            <div style={{marginTop: 100}}>
                <LoginForm
                    logo={<img alt="logo" src="/logo.png" />}
                    title="小白云工作站"
                    subTitle="—— Ebai Cloud WorkStations ——"
                    onFinish={(values) => {
                        if (values.username === "admin" && values.password === "admin") {
                            navigate("/admin")
                        }
                    }}
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
                        <ProFormCaptcha fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'}/>,
                        }} captchaProps={{
                            size: 'large',
                        }} placeholder={'请输入验证码'} captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} ${'获取验证码'}`;
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
        </Layout>);
};