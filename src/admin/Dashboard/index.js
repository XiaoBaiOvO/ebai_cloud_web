import React, {useState} from 'react';
import {Card, Cascader, DatePicker, Form, List, message, Space} from "antd";
import dayjs from "dayjs";
import {CheckOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";

import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useRequest} from "ahooks";
import {getCollectionDataList} from "../../api";
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

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

const Dashboard = () => {

    const [form] = Form.useForm();
    const [dateList, setDataList] = useState();
    const {runAsync} = useRequest(getCollectionDataList, {manual: true});

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

    return (
        <Card title="Dashboard">
            {/*<h1>管理页面维护中..</h1>*/}
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
        </Card>
    )
}
export default Dashboard;
