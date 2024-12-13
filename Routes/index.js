const express = require('express');
const authRoute = require("./AuthRoutes");
const bookRoute = require("./BookRoutes");

const api = express.Router();

api.use("/auth", authRoute);

api.use("/", bookRoute);

module.exports = api;