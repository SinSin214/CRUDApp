const { Role } = require("../../models");
const constant = require("../../static/constant");

module.exports = {
    checkAdmin,
};

async function checkAdmin(userId) {
    let user = await Role.findOne({
        where: { UserId: userId, Role: constant.ADMIN },
    });
    if (!user) {
        throw { message: "You have no permission to do this." };
    }
}
