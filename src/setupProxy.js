const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://ebai.cloud:9000",
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware("/api/ws", {
            target: "http://ebai.cloud:9000",
            ws: true,
            changeOrigin: true,
        })
    );
};
