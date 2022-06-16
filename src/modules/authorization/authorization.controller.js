const authorizationService = require("./authorization.service");
const helper = require("../helper/helper.token");

module.exports = {
    checkAdmin: async function checkAdmin(req, res, next) {
        //get UserName from Token and check if admin
        try {
            let token = req.headers["authorization"].split(" ")[1];
            let decoded = helper.verifyToken(token);
            await authorizationService.checkAdmin(decoded.UserId);
            next();
        } catch (err) {
            next(err);
        }
    },
};
