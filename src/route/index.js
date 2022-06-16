const express = require("express");
const passport = require("passport");
const session = require("express-session");
const logger = require("../middlewares/winston.middleware");
const userRoute = require("../modules/user/user.route");
const articleRoute = require("../modules/article/article.route");
const commentRoute = require("../modules/comment/comment.route");
const authenticationRoute = require("../modules/authentication/authentication.route");
const {
    authenticateRequest,
} = require("../modules/authentication/authentication.controller");
require("../middlewares/passport.middleware");

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        session({
            secret: "keyboard cat",
            resave: true,
            saveUninitialized: true,
        })
    ); // session secret
    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/authentication", authenticationRoute);
    app.get("/", (req, res) => {
        res.send("Listening port 3000");
    });
    app.use(authenticateRequest); //put above routes that need to authenticate
    app.use("/users", userRoute);
    app.use("/articles", articleRoute);
    app.use("/comments", commentRoute);

    app.use((error, req, res, next) => {
        logger.error({
            errorCode: error.status || 500,
            message: error.message || "Internal Server Error",
        });
        res.status(error.status || 500).send({
            errorCode: error.status || 500,
            message: error.message || "Internal Server Error",
        });
    });
};
