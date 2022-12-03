import {Descriptions} from "antd";
import {useSelector} from "react-redux";

export default () => {

    const {userId, userName, userAvatar, userData} = useSelector(state => state.user);

    return (
            <Descriptions layout="vertical">
            <Descriptions.Item label="UserName">{userName}</Descriptions.Item>
            <Descriptions.Item label="UserId" span={2}>{userId}</Descriptions.Item>
            <Descriptions.Item label="UserAvatar">{userAvatar}</Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
            {/*<Descriptions.Item label="Data">{userData}</Descriptions.Item>*/}
        </Descriptions>
    )
}