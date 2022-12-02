import axios from "axios";
import {setUserName} from "../redux/userSlice";

export const initAxios = dispatch => {
    axios.defaults.baseURL = "api";
    axios.defaults.validateStatus = status => {
        [401, 500].includes(status) && dispatch(setUserName(""));
        return true;
    };
};

// Collection
export const submitCollectionForm = async (params) => (await axios.post("submitCollectionForm", params)).data;
export const getCollectionDataList = async (params) => (await axios.post("collection/getCollectedStatus", params)).data;
// News
export const getNewsList = async () => (await axios.post("getNewsList")).data;
// ChatBox
export const getCommentList = async () => (await axios.post("comment/getCommentList")).data;
export const commentAdd = async (body) => (await axios.post("comment/add", body)).data;
export const commentReply = async (body) => (await axios.post("comment/reply", body)).data;
export const likeComment = async (body) => (await axios.post("comment/like", body)).data;
export const dislikeComment = async (body) => (await axios.post("comment/dislike", body)).data;


export const demo1 = async () => (await axios.get("1"));
export const demo2 = async body => (await axios.post("1", body)).data;
export const demo3 = async (body) => (await axios.post("1", body)).data;
export const demo4 = async () => (await axios.post("1",
    {
        test: ""
    })).data;

export const apiFetchData = async (params) => (await axios.post("fetchData", params)).data;
export const apiGetNE = async () => (await axios.post("fetchData", {components: {component: ""}})).data;
export const apiGetServiceData = async () => {
    const data1 = await apiGetNE();
    if (data1.result) {
        const data2 = await apiFetchData({"terminal-device": ""});
        if (data2.result) {
            const data3 = await apiFetchData({"interfaces": ""});
            if (data3.result) {
                return {
                    components: data1.data?.components,
                    "terminal-device": data2.data?.["terminal-device"],
                    interfaces: data3.data?.interfaces
                };
            }
        }
    }
    return null;
}
export const apiGetModelTableData = async () => {
    const data1 = await apiGetNE();
    const data2 = await apiGetServiceData();
    return {
        components: data1.data?.components,
        "terminal-device": data2.data?.["terminal-device"],
        interfaces: data2.data?.interfaces,
        amplifiers: null,
        "aps-modules": null
    };
}