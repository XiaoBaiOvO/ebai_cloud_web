import {ProCard} from '@ant-design/pro-components';
import {Card, Carousel, Divider} from 'antd';
import React from 'react';

import NewsList from './Components/NewsList';
import ChatBox from './Components/ChatBox';
import UserInfoList from './Components/UserInfoList';

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

export default () => {
    return (
        <>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle1}>欢迎使用小白云工具站</h3>
                </div>
                <div>
                    <h3 style={contentStyle2}>更多功能 敬请期待</h3>
                </div>
            </Carousel>
            <ProCard wrap ghost gutter={[20, 20]}>
                <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 18 }} ghost>
                    <Divider orientation="left" style={{marginTop: 11}}>热点新闻</Divider>
                    <Card>
                        <NewsList />
                    </Card>
                    <Divider orientation="left">小白云社区</Divider>
                    <Card>
                        <ChatBox />
                    </Card>
                </ProCard>
                <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6 }} ghost>
                    <Divider/>
                    <Card title="个人中心">
                        <UserInfoList />
                    </Card>
                </ProCard>
            </ProCard>
        </>
    )
}
