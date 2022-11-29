import {Button, Form, Space, Drawer, Spin, Mentions, Rate, Divider, Statistic} from "antd";
import {DefaultFooter, ProCard, StatisticCard } from "@ant-design/pro-components";
import { Line } from '@ant-design/plots';
import {Header} from "antd/es/layout/layout";
import React, {useState} from "react";
import {
    CloudFilled,
    RightOutlined,
    EllipsisOutlined,
    FrownOutlined,
    MehOutlined,
    SmileOutlined,
    ExportOutlined
} from "@ant-design/icons";
import Collection from "./collection/collection"
import styles from "./main.module.scss"

const data = [
    {
        "Date": "06:00",
        "scales": 3
    },
    {
        "Date": "07:00",
        "scales": 5
    },
    {
        "Date": "08:00",
        "scales": 9
    },
    {
        "Date": "09:00",
        "scales": 17
    },
    {
        "Date": "10:00",
        "scales": 18
    }];

const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
        // type: 'timeCat',
        tickCount: 5,
    },
};

const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};

const Main = () => {

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            console.log('Submit:', values);
        } catch (errInfo) {
            console.log('Error:', errInfo);
        }
    };

    return (
        <main className={styles.main}>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                }}
            >
                <img alt="logo" src="/logo.png" width={40} style={{marginLeft: -30}}/>
                <span style={{color: "white", fontSize: 18, marginLeft: 10}}>小白云工具站</span>
                <Space style={{position: "absolute", right: 20}}>
                    <Button style={{marginRight: 0}} ghost onClick={() => {setOpen(true)}}>数据统计</Button>
                </Space>
            </Header>
            <ProCard layout="center">
                <Collection/>
            </ProCard>
            <DefaultFooter
                style={{
                    marginTop: -40,
                    padding: 1,
                    background: 'none',
                }}
                copyright={"2022 Ebai Cloud Workstations"}
                links={[
                    {
                        key: 'Ebai Cloud Workstations',
                        title: 'XiaoBai Yun',
                        href: '',
                        blankTarget: false,
                    },
                    {
                        key: 'github',
                        title: <CloudFilled />,
                        href: '',
                        blankTarget: false,
                    },
                    {
                        key: 'Author',
                        title: 'Ethan & Daisy',
                        href: '',
                        blankTarget: false,
                    },
                ]}
            />
            <Drawer
                placement="right"
                onClose={() => {setOpen(false);}}
                open={open}
                title="感谢使用小白云"
                closable={false}
                extra={
                    <Space>
                        <Button type="dashed" shape="circle" onClick={() => {setOpen(false)}} icon={<ExportOutlined />} />
                    </Space>
                }
            >
                <div>
                    <StatisticCard
                        title={
                            <Space>
                                <span>地科2班</span>
                                <RightOutlined style={{ color: 'rgba(0,0,0,0.65)' }} />
                            </Space>
                        }
                        extra={<EllipsisOutlined />}
                        statistic={{
                            // icon: <SettingTwoTone style={{ color: 'rgba(0,0,0,0.65)' }} spin />,
                            icon: <Spin />,
                            value: 15,
                            suffix: '人',
                            // title: '当前完成人数:',
                            prefix: '当前完成人数:',
                            description: (
                                <Space>
                                    <Statistic title="实际完成度:" value="75%" trend="up" />
                                    <Statistic title="总人数:" value="20人" />
                                </Space>
                            ),
                        }}
                        chart={
                            <Line {...config} style={{height: 150}} />
                            }
                    />
                    <Divider type='horizontal' />
                    <Form form={form} layout="horizontal" onFinish={onFinish}>
                        <Form.Item
                            name="coders"
                            label="姓名"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            // rules={[
                            //     {
                            //         validator: checkMention,
                            //     },
                            // ]}
                        >
                            <Mentions
                                rows={1}
                                placeholder="非必填"
                                options={[
                                    {
                                        value: 'afc163',
                                        label: 'afc163',
                                    },
                                    {
                                        value: 'zombieJ',
                                        label: 'zombieJ',
                                    },
                                    {
                                        value: 'yesmeck',
                                        label: 'yesmeck',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="评价"
                            label="评价"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Mentions
                                rows={3}
                                placeholder="可以对小白云给出评价或提出建议"
                                options={[
                                    {
                                        value: 'afc163',
                                        label: 'afc163',
                                    },
                                    {
                                        value: 'zombieJ',
                                        label: 'zombieJ',
                                    },
                                    {
                                        value: 'yesmeck',
                                        label: 'yesmeck',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            name="stars"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                        >
                            打分<Rate style={{marginLeft: 20}} defaultValue={3} character={({ index }) => customIcons[index + 1]} />                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 14,
                                offset: 6,
                            }}
                        >
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={() => {form.resetFields();}}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </main>
    );
};

export default Main;
