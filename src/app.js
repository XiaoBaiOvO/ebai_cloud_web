import {useLayoutEffect} from "react";
import {useRequest} from "ahooks";
import {useDispatch} from "react-redux";
import {useRoutes} from "react-router-dom";
import "antd/dist/antd.min.css";

import {routes} from "./config/config";
import {apiGetUser, initAxios} from "./api/api";
import {setUserName} from "./redux/userSlice";

const App = () => {
    const dispatch = useDispatch();
    const {runAsync} = useRequest(apiGetUser, {manual: true});

    useLayoutEffect(() => {
        initAxios(dispatch);
        runAsync().then(response => {
            response.status === 200 && dispatch(setUserName(response.data?.data?.name ?? ""));
        })
    }, []);

    return useRoutes(routes);
};

export default App;
