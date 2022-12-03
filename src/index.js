// import {StrictMode} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./app";
import store from "./redux/store";
import {Button, ConfigProvider} from "antd";

ReactDOM.render(
    // <StrictMode>
    <Provider store={store} >
        <BrowserRouter>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#00b96b',
                    },
                }}
            >
                <Button>123</Button>
            <App/>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>,
    // </StrictMode>,
    document.getElementById("root")
);
