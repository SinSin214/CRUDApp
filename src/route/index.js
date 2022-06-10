const express = require("express");
const userRoute = require("../user/userRoute");
const articleRoute = require("../article/articleRoute");
const commentRoute = require("../comment/commentRoute");

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/users", userRoute);
    app.use("/articles", articleRoute);
    app.use("/comments", commentRoute);
};
