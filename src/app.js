import {useRoutes} from "react-router-dom";
import "antd/dist/antd.min.css";

import {routes} from "./config/config";
import {useLayoutEffect} from "react";
import {initAxios} from "./api";
import {useDispatch} from "react-redux";



const App = () => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        initAxios(dispatch);
    }, []);

    return useRoutes(routes);
};

export default App;
