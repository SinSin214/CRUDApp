const bcrypt = require("bcryptjs");
const User = require("../../models").User;

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

    await User.update(
        {
            Password: await bcrypt.hash(params.password, 10),
            RealPassword: params.password,
        },
        { where: { id: user.id } }
    );
}

async function _delete(id) {
    await getUser(id);

    await User.update({ Deleted: true }, { where: { id: id } });
}

async function getUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw { message: "User not found" };
    return user;
}
