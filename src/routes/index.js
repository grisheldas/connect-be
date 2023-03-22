const express = require("express");
const Router = express.Router();
const { newsController } = require("../controllers");

const { getNews } = newsController;

Router.get("/getNews", getNews);

module.exports = Router;
