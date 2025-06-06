const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/sitemap.xml",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL_FOR_IMAGE,
      changeOrigin: true,
    })
  );
};
