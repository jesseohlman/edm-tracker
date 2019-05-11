const express = require("express");
const app = express();
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config");
const mainRoute = require("./routes/static");

appConfig.init(app, express);
//routeConfig.init(app);
app.use("/", mainRoute);

module.exports = app;