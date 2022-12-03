import React, { useEffect, useState } from 'react';import {Card} from "antd";
import {useRequest} from "ahooks";
import {getNewsList} from "../../api";

const CollectionReport = () => {

    const [newsList, setNewsList] = useState([]);
    const {runAsync} = useRequest(getNewsList, {manual: true});
    useEffect(() => {
        runAsync().then((response) => {
            setNewsList(response)
        });

    }, []);
    return (
        <Card title="Collection Report">
            <h1>管理页面维护中..</h1>
        </Card>
    )
}
export default CollectionReport;
