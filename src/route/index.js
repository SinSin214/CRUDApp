const express = require("express");
const userRoute = require("../modules/user/user.route");
const articleRoute = require("../modules/article/article.route");
const commentRoute = require("../modules/comment/comment.route");
const authenticationRoute = require("../modules/authentication/authentication.route");
const {
    authenticateRequest,
} = require("../modules/authentication/authentication.controller");

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/authentication", authenticationRoute);
    app.use(authenticateRequest); //put above routes that need to authenticate
    app.use("/users", userRoute);
    app.use("/articles", articleRoute);
    app.use("/comments", commentRoute);

    app.use((error, req, res, next) => {
        res.status(error.status || 500).send({
            ErrorCode: error.status || 500,
            Message: error.message || "Internal Server Error",
        });
    });
};
