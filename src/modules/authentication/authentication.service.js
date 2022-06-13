const bcrypt = require("bcryptjs");
const { User } = require("../../models");

module.exports = {
    actionLogin,
    storeRefreshToken,
    getUserAndCheckRefreshToken,
    registerUser,
};

async function actionLogin(params) {
    let user = await getUserByUserName(params.UserName);
    if (!user) {
        throw { message: "Username does not existed" };
    }
    let match = await bcrypt.compare(params.Password, user.Password);
    if (!match) {
        throw { message: "Password is not correct" };
    }
    return user.id;
}

async function storeRefreshToken(userId, token, refreshToken) {
    await User.update(
        { Token: token, RefreshToken: refreshToken },
        { where: { id: userId } }
    );
}

async function getUserByUserName(username) {
    return await User.findOne({ where: { UserName: username } });
}

async function getUserAndCheckRefreshToken(userId, refreshToken) {
    let user = await User.findOne({ where: { id: userId } });
    if (!user || refreshToken !== user.RefreshToken) {
        throw { message: "Refresh token is not valid" };
    }
    return user;
}

async function registerUser(params) {
    const user = await getUserByUserName(params.UserName);
    if (user) {
        throw { message: "Username is already registered" };
    }
    return await User.create({
        UserName: params.UserName,
        Password: await bcrypt.hash(params.Password, 10),
        RealPassword: params.Password,
    });
}
