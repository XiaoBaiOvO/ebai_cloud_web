const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://18.162.52.236:8000",
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware("/api/ws", {
            target: "ws://18.162.52.236:8000",
            ws: true,
            changeOrigin: true,
        })
    );
};
