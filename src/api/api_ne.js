import axios from "axios";
import {setUserName} from "../redux/userSlice";

export const initAxios = dispatch => {
    axios.defaults.baseURL = "api";
    axios.defaults.validateStatus = status => {
        [401, 500].includes(status) && dispatch(setUserName(""));
        return true;
    };
};

export const apiSubmitCollectionForm = async (params) => (await axios.post("submitCollectionForm", params)).data;

export const apiUploadFile = async (body) => (await axios.post("upload", body)).data;

export const apiGetUser = async () => (await axios.get("currentUser"));

export const apiLogin = async userInfo => (await axios.post("login/account", userInfo)).data;

export const apiLogout = async () => (await axios.post("login/outLogin")).data;

export const apiEditRpc = async (params) => (await axios.post('editRpc', params)).data;

export const apiCallRpc = async (params) => (await axios.post('rpc', params)).data;

export const apiFetchData = async (params) => (await axios.post("fetchData", params)).data;

export const apiGetNE = async () => (await axios.post("fetchData", {components: {component: ""}})).data;

export const apiSystem = async () => (await axios.post("fetchData", {
    system: {
        state: "",
        memory: "",
        cpus: ""
    }
})).data;

export const apiSystemAllConfig = async () => (await axios.post("fetchData", {
    system: {
        config: "",
        state: "",
        clock: "",
        ntp: ""
    }
})).data;

export const apiGetAlarms = async () => (await axios.post("fetchData", {system: {alarms: ""}})).data;

export const apiGetPMPs = async () => (await axios.post("fetchData", {performance: {pmps: {pmp: ""}}})).data;

export const apiGetEnabledPMPs = async () => (await axios.post("fetchData", {performance: {pmps: {pmp: {'pm-point-enable': true}}}})).data;

export const apiGetTCAs = async () => (await axios.post("fetchData", {performance: {tcas: {tca: ""}}})).data;

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

export const apiGetLLDP = async () => (await axios.post("fetchData", {lldp: ""})).data;

export const apiRpc = async (params) => (await axios.post("/rpc", params)).data;

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