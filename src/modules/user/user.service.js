const bcrypt = require("bcryptjs");
const { User } = require("../../models");

module.exports = {
    getAll,
    getById,
    update,
    delete: _delete,
    getUser,
};

async function getAll() {
    return await User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function update(id, params) {
    const user = await getUser(id);
    const match = await bcrypt.compare(params.password, user.Password);
    if (match) {
        throw { message: "New and Old password cannot be same" };
    }

    await user.update({
        Password: await bcrypt.hash(params.password, 10),
    });
}

async function _delete(id) {
    await User.destroy({
        where: {
            id: id,
        },
    });
}

async function getUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw { message: "User not found" };
    return user;
}
