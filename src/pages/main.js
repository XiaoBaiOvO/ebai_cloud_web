import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {
    Button,
    Form,
    Space,
    Drawer,
    Mentions,
    Rate,
    Divider,
    Layout,
    Card,
    message,
    List,
    Cascader,
    DatePicker,
} from "antd";
import {
    FrownOutlined,
    MehOutlined,
    SmileOutlined,
    ExportOutlined,
    CheckOutlined,
    UserOutlined,
    CloseOutlined,
} from "@ant-design/icons";

import {getCollectionDataList} from "../api";

import Collection from "./collection/collection"
import MyFooter from "./Commponents/MyFooter";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const {Header} = Layout;
const dateFormat = 'YYYY-MM-DD';

const options = [
    {
        value: '地科1班',
        label: '地科1班',
        children: [
            {
                value: '核酸检测截图',
                label: '核酸检测截图',
            },
            {
                value: '双码',
                label: '双码',
            }
        ],
    },
    {
        value: '地科2班',
        label: '地科2班',
        children: [
            {
                value: '核酸检测截图',
                label: '核酸检测截图',
            },
            {
                value: '双码',
                label: '双码',
            }
        ],
    },
];

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

    useEffect(() => {
        getCollectionData("地科2班", "核酸检测截图", dayjs())
    }, [])

    const updateQueryRequest = async () => {
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
                    <Button ghost onClick={() => {
                        navigate("/login");
                    }}>管理页面</Button>
                    <Button ghost onClick={() => {
                        setOpen(true);
                        setTimeout(() => {
                            updateQueryRequest().then(() => {})
                        },100);
                    }}>数据统计</Button>
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
                <Divider orientation="left">快捷查询</Divider>
                <Form
                    onValuesChange={updateQueryRequest}
                    form={form}
                    style={{width: "100%"}}
                    layout="inline"
                    initialValues={{
                        queryRequest: ["地科2班", "核酸检测截图"],
                        date: dayjs()
                    }}
                >
                    <Space.Compact block>
                        <Form.Item name="queryRequest" style={{width: 197, margin: 0}}>
                            <Cascader options={options}/>
                        </Form.Item>
                        <Form.Item name="date" style={{width: 115, margin: 0}}>
                            <DatePicker allowClear={false} placeholder="请选择日期" format={dateFormat}/>
                        </Form.Item>
                    </Space.Compact>
                </Form>
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
                                        <a>{item.time.substring(0, 8)}</a>
                                        <CheckOutlined style={{marginLeft: 20}}/>
                                    </>) : <CloseOutlined/>}
                            </List.Item>
                        )}
                    />
                </Card>
                <Divider orientation="left">用户调查</Divider>
                <div>
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
                            label="打分"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Rate style={{marginLeft: 20}} defaultValue={5} character={({index}) => customIcons[index + 1]}/> </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 14,
                                offset: 6,
                            }}
                        >
                            <Button htmlType="submit" type="primary">
                                提交
                            </Button>
                            <Button htmlType="button" onClick={() => {
                                form.resetFields();
                            }}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Drawer>
        </Layout>
    );

};

export default Main;
