import {
    Button,
    Form,
    Space,
    Drawer,
    Spin,
    Mentions,
    Rate,
    Divider,
    Statistic,
    Layout, Card, Select, Dropdown, message, List, Avatar, Cascader, DatePicker,
} from "antd";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./main.module.scss";
import {
    CloudFilled,
    RightOutlined,
    EllipsisOutlined,
    FrownOutlined,
    MehOutlined,
    SmileOutlined,
    ExportOutlined, CopyrightOutlined, DoubleLeftOutlined, DownOutlined, CheckOutlined, UserOutlined, CloseOutlined,
} from "@ant-design/icons";
import Collection from "./collection/collection"
import {useRequest} from "ahooks";
import {getCollectionDataList} from "../api";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import MyFooter from "./Commponents/MyFooter";
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const { Header, Footer } = Layout;

const options = [
    {
        value: '地科1班',
        label: '地科1班',
        children: [
            {
                value: '核酸检测截图',
                label: ' 核酸',
            },
            {
                value: '双码',
                label: ' 双码',
            }
        ],
    },
    {
        value: '地科2班',
        label: '地科2班',
        children: [
            {
                value: '核酸检测截图',
                label: ' 核酸',
            },
            {
                value: '双码',
                label: ' 双码',
            }
        ],
    },
];

// const config = {
//     data,
//     padding: 'auto',
//     xField: 'Date',
//     yField: 'scales',
//     xAxis: {
//         // type: 'timeCat',
//         tickCount: data.length,
//     },
//     yAxis: {
//         // type: 'timeCat',
//         tickCount: 6,
//     },
// };

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
    const navigate = useNavigate();
    const {runAsync} = useRequest(getCollectionDataList, {manual: true});
    const [dateList, setDataList] = useState();

    const getCollectionData = (classNumber, formType, date) => {
        const request = {
            formType: formType,
            classNumber: classNumber,
            date: date
        }
        runAsync(request).then((response) => {
            setDataList(response.resultObject.dataList)
        }).catch((e) => {
            message.error(e).then(() => {})
        });
    };

    const updateQueryRequest = async () => {
        console.log(form.getFieldValue("date"))
        getCollectionData(
            form.getFieldValue("queryRequest")[0],
            form.getFieldValue("queryRequest")[1],
            form.getFieldValue("date"))
    }

    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            console.log('Submit:', values);
        } catch (errInfo) {
            console.log('Error:', errInfo);
        }
    };

    return (
        <Layout style={{alignItems: 'center', minHeight: document.documentElement.clientHeight - 1}}>
            {/*<Alert*/}
            {/*    style={{width: "100%"}}*/}
            {/*    // message="网站适配存在一定缺陷，请不要使用智能设备访问，梦里啥都能连接"*/}
            {/*    message="目前网页适配存在一定缺陷，如显示异常请切换浏览器或设备访问"*/}
            {/*    type="warning"*/}
            {/*    showIcon*/}
            {/*    closable*/}
            {/*/>*/}
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                }}
            >
                <img alt="logo" src="/logo.png" width={40} style={{marginLeft: -30}}/>
                <span style={{color: "white", fontSize: 18, marginLeft: 10}}>小白云工作站</span>
                <Space style={{position: "absolute", right: 20}}>
                    <Button ghost onClick={() => {navigate("/login")}}>管理页面</Button>
                    <Button ghost onClick={() => {setOpen(true)}}>数据统计</Button>
                </Space>
            </Header>
            <Collection/>
            <MyFooter/>
            <Drawer
                placement="right"
                onClose={() => {
                    setOpen(false);
                }}
                open={open}
                title="感谢使用小白云"
                closable={false}
                extra={
                    <Space>
                        <Button type="dashed" shape="circle" onClick={() => {
                            setOpen(false)
                        }} icon={<ExportOutlined/>}/>
                    </Space>
                }
            >
                <Form
                    onValuesChange={updateQueryRequest}
                    form={form}
                    layout="inline"
                    initialValues={{
                        queryRequest: ["地科2班", "核酸检测截图"],
                        date: dayjs()
                    }}
                >
                    <Space>
                        <Form.Item name="queryRequest">
                            <Cascader options={options} style={{width: 195}}/>
                        </Form.Item>
                        <Form.Item name="date">
                            <DatePicker
                                suffixIcon={null}
                                allowClear={false}
                                style={{width: 110}}
                                placeholder="请选择日期"
                                format={dateFormat}
                                disabled />
                        </Form.Item>
                    </Space>
                </Form>
                {/*<Space>*/}
                {/*    <Cascader*/}
                {/*        defaultValue={"请选择"}*/}
                {/*        options={options}*/}
                {/*        onChange={onChangeClass}/>*/}
                {/*    <DatePicker*/}
                {/*        onChange={onChangeDate}/>*/}
                {/*</Space>*/}

                <Card size="small">
                    <List
                        itemLayout="horizontal"
                        dataSource={dateList}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a>{item.name}</a>}
                                    avatar={<UserOutlined/>}
                                />
                                {item.time !== null ? (
                                    <>
                                        <a>{item.time}</a>
                                        <CheckOutlined/>
                                    </>) : <CloseOutlined/>}
                            </List.Item>
                        )}
                    />
                </Card>


                <Divider type='horizontal'/>
                <div>
                    {/*<StatisticCard*/}
                    {/*    title={*/}
                    {/*        <Space>*/}
                    {/*            <span>地科2班</span>*/}
                    {/*            <RightOutlined style={{ color: 'rgba(0,0,0,0.65)' }} />*/}
                    {/*        </Space>*/}
                    {/*    }*/}
                    {/*    extra={<EllipsisOutlined />}*/}
                    {/*    statistic={{*/}
                    {/*        // icon: <SettingTwoTone style={{ color: 'rgba(0,0,0,0.65)' }} spin />,*/}
                    {/*        icon: <Spin />,*/}
                    {/*        value: 9,*/}
                    {/*        suffix: '人',*/}
                    {/*        // title: '当前完成人数:',*/}
                    {/*        prefix: '当前完成人数:',*/}
                    {/*        description: (*/}
                    {/*            <Space>*/}
                    {/*                <Statistic title="实际完成度:" value="69.2%" trend="up" />*/}
                    {/*                <Statistic title="总人数:" value="13人" />*/}
                    {/*            </Space>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*    chart={*/}
                    {/*        <Line {...config} style={{height: 150}} />*/}
                    {/*        }*/}
                    {/*/>*/}
                    <Divider type='horizontal'/>
                    <Form layout="horizontal" onFinish={onFinish}>
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
                            打分<Rate style={{marginLeft: 20}} defaultValue={3}
                                      character={({index}) => customIcons[index + 1]}/> </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 14,
                                offset: 6,
                            }}
                        >
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={() => {
                                form.resetFields();
                            }}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </Layout>
    );

};

export default Main;
