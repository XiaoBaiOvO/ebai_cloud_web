import React from 'react';
import {Badge, Card, Dropdown, Space, Table, Tag} from "antd";
import {CheckOutlined, DownOutlined} from "@ant-design/icons";

const items = [
    {
        key: '1',
        label: '操作1',
    },
    {
        key: '2',
        label: '操作2',
    },
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '居住情况',
        dataIndex: 'version',
        key: 'version',
    },
    {
        title: '应完成表单',
        dataIndex: 'formTypes',
        key: 'formTypes',
        render: (_, { formTypes }) => (
            <>
                {formTypes.map((formType) => {
                    let color = formType.length > 5 ? 'geekblue' : 'green';
                    if (formType === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={formType}>
                            {formType.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        title: '提交状态',
        dataIndex: 'platform',
        key: 'platform',
        render: () => (
            <span>
                        <Badge status="success" />
                        完成
                    </span>
        ),
    },
    {
        title: '完成时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: '操作',
        key: 'operation',
        render: () =>
            <Space size="middle">
                <a>操作</a>
                <a>拒绝</a>
            </Space>
    },
];

const CollectionDetail = () => {

    const expandedRowRender = () => {

        const columns = [
            {
                title: '提交时间',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '提交类型',
                dataIndex: 'formType',
                key: 'formType',
                render: ((formType) => {
                            let color = formType.length > 5 ? 'geekblue' : 'green';
                            if (formType === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={formType}>
                                    {formType.toUpperCase()}
                                </Tag>
                            );
                        })
            },
            {
                title: '提交状态',
                key: 'state',
                render: () => (
                    <CheckOutlined />
                ),
            },
            {
                title: '文件ID',
                dataIndex: 'fileId',
                key: 'fileId',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <Space size="middle">
                        <a>操作</a>
                        <a>拒绝</a>
                        <Dropdown
                            menu={{items}}>
                            <a>
                                更多
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </Space>
                ),
            },
        ];
        const data = [
            {
                key: 1,
                date: '2022-12-02 23:12:00',
                formType: '健康码',
                fileId: '11f46790-ca43-58c7-3ece-4392835b96f4',
            },
            {
                key: 2,
                date: '2022-12-02 23:13:00',
                formType: '行程卡',
                fileId: '11f46790-ca43-58c7-3ece-4392835b96f4',
            },
            {
                key: 2,
                date: '2022-12-02 23:13:00',
                formType: '核酸检测截图',
                fileId: '11f46790-ca43-58c7-3ece-4392835b96f4',
            },
        ]
        return <Table columns={columns} dataSource={data} pagination={false} size="small"/>;
    };

    const data = [];
    for (let i = 0; i < 30; ++i) {
        data.push({
            key: i.toString(),
            name: '小白',
            version: '在家',
            formTypes: ["双码", "核酸检测截图"],
            creator: 'Jack',
            createdAt: '2022-12-02 23:12:00',
        });
    }

    return (
        <Card title="收集情况查询">
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender,
                }}
                dataSource={data}
                size="middle"
            />
        </Card>
    )}
export default CollectionDetail;
