// import { commentAdd, commentReply, dislikeComment, getCommentList, likeComment, } from '@/services/ant-design-pro/api';
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, UserOutlined} from '@ant-design/icons';
import { Avatar, Button, Comment, Divider, Form, Input, List, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { createElement, useEffect, useState } from 'react';
import {getCommentList, dislikeComment, commentAdd, commentReply, likeComment} from "../../../api";
import {useRequest} from "ahooks";

const { Search } = Input;

const ChatBox = () => {

    const [replyAction, setReplyAction] = useState({ key: '', isAction: false });
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [commentList, setCommentList] = useState([]);
    const {runAsync: runGetCommentList} = useRequest(getCommentList, {manual: true});
    const {runAsync: runCommentAdd} = useRequest(commentAdd, {manual: true});
    const {runAsync: runCommentReply} = useRequest(commentReply, {manual: true});
    const {runAsync: runLikeComment} = useRequest(likeComment, {manual: true});
    const {runAsync: runDislikeComment} = useRequest(dislikeComment, {manual: true});



    const commentTextInput = (e) => {
        setValue(e.target.value);
    };
    const refreshCommentList = async () => {
        runGetCommentList().then((response) => {
            setCommentList(response)
        });
    };
    useEffect(() => {
        refreshCommentList().then();
    }, []);

    const submitComment = () => {
        if (!value)
            return;
        const request = {
            userid: "01",
            name: "admin",
            avatar: "https://joeschmoe.io/api/v1/4",
            content: value,
        };
        setSubmitting(true);
        runCommentAdd(request).then(() => {
            setValue('');
            refreshCommentList().then();
            setSubmitting(false);
        });
    };
    const commentActions = (item) => {
        const request = { id: item.id, userid: "01" };
        const like = async () => {
            runLikeComment(request).then((response) => {
                setCommentList(response);
            });
        };
        const dislike = async () => {
            runDislikeComment(request).then((response) => {
                setCommentList(response);
            });
        };
        const changeActive = () => {
            if (replyAction.key) {
                if (replyAction.key === item.id + '0') {
                    setReplyAction({ key: item.id + '0', isAction: !replyAction.isAction });
                }
                else {
                    setReplyAction({ key: item.id + '0', isAction: replyAction.isAction });
                }
            }
            else {
                setReplyAction({ key: item.id + '0', isAction: !replyAction.isAction });
            }
        };
        const submitReply = async (replyValue) => {
            const replyRequest = {
                id: item.id,
                userid: "01",
                name: "admin",
                avatar: "https://joeschmoe.io/api/v1/4",
                content: replyValue,
            };
            runCommentReply(replyRequest).then((response) => {
                setCommentList(response)
            });
            changeActive();
        };
        return [
            <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(item.likes.indexOf("01") !== -1 ? LikeFilled : LikeOutlined)}
            <span>{item.likes.length}</span>
        </span>
            </Tooltip>,
            <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(item.dislikes.indexOf("01") !== -1 ? DislikeFilled : DislikeOutlined)}
            <span>{item.dislikes.length}</span>
        </span>
            </Tooltip>,
            <span key="comment-basic-reply-to" onClick={changeActive}>
        Reply to
      </span>,
            replyAction.key === item.id + '0' && replyAction.isAction ? (<Search onSearch={submitReply} enterButton="sent" size={'small'} style={{ marginBottom: -5 }}/>) : null,
        ];
    };
    const replyActions = (item, replyItem) => {
        const changeActive = () => {
            if (replyAction.isAction) {
                if (replyAction.key === item.id + replyItem.id) {
                    setReplyAction({ key: item.id + replyItem.id, isAction: !replyAction.isAction });
                }
                else {
                    setReplyAction({ key: item.id + replyItem.id, isAction: replyAction.isAction });
                }
            }
            else {
                setReplyAction({ key: item.id + replyItem.id, isAction: !replyAction.isAction });
            }
        };
        const submitReply = async (replyValue) => {
            const replyRequest = {
                id: item.id,
                userid: "01",
                name: "admin",
                avatar: "https://joeschmoe.io/api/v1/4",
                content: replyValue,
            };
            runCommentReply(replyRequest).then((response) => {
                setCommentList(response)
            });
            changeActive();
        };
        return [
            <span key="comment-basic-reply-to" onClick={changeActive}>
        Reply to
      </span>,
            replyAction.key === item.id + replyItem.id && replyAction.isAction ? (<Search onSearch={submitReply} enterButton="sent" size={'small'} style={{ marginBottom: -5 }}/>) : null,
        ];
    };
    return (<div style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
        <Comment style={{ marginTop: -16 }} avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />} content={<div>
            <Form.Item>
                <TextArea rows={4} value={value} onChange={commentTextInput} autoSize={{ minRows: 3 }} onPressEnter={submitComment}/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={submitComment} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </div>}/>
        <List itemLayout="horizontal" style={{ marginTop: -32 }} dataSource={commentList} renderItem={(item) => (<div>
            {/*<Comment style={{ marginTop: -16 }} actions={commentActions(item)} author={item.author} avatar={item.avatar} content={item.content} datetime={item.datetime}>*/}
            {/*    <List style={{ marginTop: -16 }} dataSource={item.reply} locale={{ emptyText: ' ' }} renderItem={(replyItem) => (<Comment actions={replyActions(item, replyItem)} author={replyItem.author} avatar={replyItem.avatar} content={replyItem.content} datetime={replyItem.datetime}/>)}/>*/}
            {/*</Comment>*/}

            <Comment style={{ marginTop: -16 }} actions={commentActions(item)} author={item.author} avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />} content={item.content} datetime={item.datetime}>
                <List style={{ marginTop: -16 }} dataSource={item.reply} locale={{ emptyText: ' ' }} renderItem={(replyItem) => (<Comment actions={replyActions(item, replyItem)} author={replyItem.author} avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />} content={replyItem.content} datetime={replyItem.datetime}/>)}/>
            </Comment>

            <Divider style={{ marginTop: -12 }}/>
        </div>)}/>
    </div>);
};
export default ChatBox;