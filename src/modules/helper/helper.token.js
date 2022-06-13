const jwt = require("jsonwebtoken");
const config = require("../../config/config.token.json");

module.exports = {
    generateToken: (key) => {
        return jwt.sign({ UserId: key }, config.secret, {
            expiresIn: config.tokenLife,
        });
    },

    generateRefreshToken: (key) => {
        return jwt.sign({ UserId: key }, config.refreshTokenSecret, {
            expiresIn: config.refreshTokenLife,
        });
    },

    verifyToken: (token) => {
        try {
            return jwt.verify(token, config.secret);
        } catch (error) {
            throw { message: `Error in verify access token: ${error}` };
        }
    },

    decodeToken: (token) => {
        try {
            return jwt.verify(token, config.secret, {
                ignoreExpiration: true,
            });
        } catch (error) {
            throw { message: `Error in decode access token: ${error}` };
        }
    },
};
