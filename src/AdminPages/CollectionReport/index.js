import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    Cascader,
    Col,
    DatePicker,
    Divider,
    Form,
    List,
    message,
    Row,
    Select,
    Space,
    Statistic, Steps
} from "antd";
import dayjs from "dayjs";
import {useRequest} from "ahooks";
import {getCollectionDataList} from "../../api";
import {ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined, UserOutlined} from "@ant-design/icons";
import {ProCard} from "@ant-design/pro-components";
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const dateFormat = 'YYYY-MM-DD';
dayjs.locale('zh-cn');


export default () => {

    const [form] = Form.useForm();
    const {runAsync} = useRequest(getCollectionDataList, {manual: true});
    const [dateList, setDataList] = useState();

    const onFinish = (values) => {
        runAsync(values).then((response) => {
            setDataList(response.resultObject.dataList)
        }).catch((e) => {
            message.error(e).then()
        });
    };

    useEffect(() => {
        const request = {
            formType: "核酸检测截图",
            classNumber: "地科2班",
            date: dayjs()
        }
        runAsync(request).then((response) => {
            setDataList(response.resultObject.dataList)
        }).catch((e) => {
            message.error(e).then()
        });
    }, [])


    return (
       <div>
            <Card>
                <Form
                    form={form}
                    onValuesChange={(_, allValues) => onFinish(allValues)}
                    onFinish={onFinish}
                    initialValues={{
                        classNumber: "地科2班",
                        formType: "核酸检测截图",
                        date: dayjs()
                    }}
                    labelCol={{span: 3}}

                >
                    <Form.Item label="班级" name="classNumber" rules={[{required: true}]}>
                        <Select>
                            <Select.Option value="地科1班">地科1班</Select.Option>
                            <Select.Option value="地科2班">地科2班</Select.Option>
                            <Select.Option value="小白云开发组">小白云开发组</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="表单类型" name="formType" rules={[{required: true}]}>
                        <Select>
                            <Select.Option value="双码">双码</Select.Option>
                            <Select.Option value="核酸检测截图">核酸检测截图</Select.Option>
                            <Select.Option value="青年大学习截图">学习截图</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date" rules={[{required: true}]}>
                        <DatePicker
                            locale={locale}
                            allowClear={false}
                            placeholder="请选择日期"
                            format={dateFormat}
                            style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "right"}}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button htmlType="button" onClick={() => form.resetFields()} style={{marginLeft: 8}}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
           <br/>
           <ProCard wrap ghost gutter={[20, 20]}>
               <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8 }}>
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
               </ProCard>
               <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 16 }}>
                   <div>
                       <div className="site-statistic-demo-card">
                           <Row gutter={16}>
                               <Col span={12}>
                                   <Card>
                                       <Statistic
                                           title="Active"
                                           value={11.28}
                                           precision={2}
                                           valueStyle={{
                                               color: '#3f8600',
                                           }}
                                           prefix={<ArrowUpOutlined />}
                                           suffix="%"
                                       />
                                   </Card>
                               </Col>
                               <Col span={12}>
                                   <Card>
                                       <Statistic
                                           title="Idle"
                                           value={9.3}
                                           precision={2}
                                           valueStyle={{
                                               color: '#cf1322',
                                           }}
                                           prefix={<ArrowDownOutlined />}
                                           suffix="%"
                                       />
                                   </Card>
                               </Col>
                           </Row>
                       </div>
                   </div>
                   <Steps
                       current={1}
                       items={[
                           {
                               title: 'Finished',
                               description: "description"
                           },
                           {
                               title: 'In Progress',
                               subTitle: 'Left 00:00:08',
                               description: "description"
                           },
                           {
                               title: 'Waiting',
                               description: "description"
                           },
                       ]}
                   />
               </ProCard>
           </ProCard>

       </div>
    )
}