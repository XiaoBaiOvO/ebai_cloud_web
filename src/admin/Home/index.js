import News from './Components/News';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Card, Carousel, Col, Row } from 'antd';
import React from 'react';
import ChatBox from './Components/ChatBox';
// import PersonalInfo from '../Components/PersonalInfo/index';
const contentStyle1 = {
    height: '200px',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
    background: '#4a8cfe',
    fontSize: 30,
};
const contentStyle2 = {
    height: '200px',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
    background: '#d79ad0',
    fontSize: 30,
};
const Welcome = () => {
    return (
        <div>
        {/*<PageContainer>*/}
        <Carousel autoplay>
            <div>
                <h3 style={contentStyle1}>欢迎使用小白云工具站</h3>
            </div>
            <div>
                <h3 style={contentStyle2}>更多功能 敬请期待</h3>
            </div>
        </Carousel>

        <ProCard wrap ghost gutter={[20, 20]}>
            <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 18 }} bodyStyle={{ padding: 0 }}>
                <Card title="热点新闻" bodyStyle={{ padding: 0 }}>
                    <News />
                </Card>
            </ProCard>

            <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6 }} bodyStyle={{ padding: 0 }}>
                <Card title="个人中心" bodyStyle={{ padding: 0 }}>
                    {/*<PersonalInfo />*/}
                </Card>
            </ProCard>
        </ProCard>

        <br />

        <Row gutter={20}>
            <Col span={18}>
                {/*<div>*/}
                {/*  <Card*/}
                {/*    style={{ marginBottom: 24 }}*/}
                {/*    title="热点新闻"*/}
                {/*    bordered={false}*/}
                {/*    bodyStyle={{ padding: 0 }}*/}
                {/*  >*/}
                {/*    <News />*/}
                {/*  </Card>*/}
                {/*</div>*/}
                <div>
                    <Card style={{ marginBottom: 24 }} title="小白云社区" bordered={false} bodyStyle={{ padding: 0 }}>
                        <ChatBox />
                    </Card>
                </div>
            </Col>

            {/*<Col span={6}>*/}
            {/*  <Card*/}
            {/*    style={{ marginBottom: 24 }}*/}
            {/*    title="个人中心"*/}
            {/*    bordered={false}*/}
            {/*    bodyStyle={{ padding: 0 }}*/}
            {/*  >*/}
            {/*    <PersonalInfo />*/}
            {/*  </Card>*/}
            {/*</Col>*/}
        </Row>
    {/*</PageContainer>*/}
        </div>);
};
export default Welcome;
