const authenticationService = require("./authentication.service");
const helper = require("../helper/helper.token");

module.exports = {
    actionLogIn: async function actionLogIn(req, res) {
        try {
            let UserId = await authenticationService.actionLogin(req.body);
            let token = helper.generateToken(UserId);
            let refreshToken = helper.generateRefreshToken(UserId);
            await authenticationService.storeRefreshToken(
                UserId,
                token,
                refreshToken
            );
            res.json({ token, refreshToken });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    actionRefreshToken: async function actionRefreshToken(req, res, next) {
        try {
            let authHeader = req.headers["authorization"];
            let refreshToken = req.body.refreshToken;
            if (authHeader) {
                let token = authHeader.split(" ")[1];
                let decoded = helper.decodeToken(token);
                await authenticationService.getUserAndCheckRefreshToken(
                    decoded.UserId,
                    refreshToken
                );
                token = helper.generateToken(decoded.UserId);
                res.send({ token });
            }
        } catch (err) {
            next(err);
        }
    },

    authenticateRequest: async function authenticateRequest(req, res, next) {
        try {
            let authHeader = req.headers["authorization"];
            if (authHeader) {
                let token = authHeader.split(" ")[1];
                let verified = helper.verifyToken(token);
                if (!verified) {
                    throw { status: 401, message: "Unauthorized access." };
                }
            } else {
                throw { status: 403, message: "No token provided." };
            }
            next();
        } catch (err) {
            next(err);
        }
    },

    actionRegister: async function actionRegister(req, res, next) {
        try {
            let user = await authenticationService.registerUser(req.body);
            let token = helper.generateToken(user.id);
            let refreshToken = helper.generateRefreshToken(user.id);
            await authenticationService.storeRefreshToken(
                user.id,
                token,
                refreshToken
            );
            res.json({ token, refreshToken });
        } catch (err) {
            next(err);
        }
    },
};
