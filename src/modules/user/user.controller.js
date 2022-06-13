const userService = require("./user.service");

module.exports = {
    getAll: function getAll(req, res, next) {
        userService
            .getAll()
            .then((users) => res.json(users))
            .catch((err) => {
                next(err);
            });
    },
    getById: function getById(req, res, next) {
        userService
            .getById(req.params.id)
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                next(err);
            });
    },
    update: function update(req, res, next) {
        userService
            .update(req.params.id, req.body)
            .then(() => res.json({ message: "User updated" }))
            .catch((err) => {
                next(err);
            });
    },
    _delete: function _delete(req, res, next) {
        userService
            .delete(req.params.id)
            .then(() => res.json({ message: "User deleted" }))
            .catch((err) => {
                next(err);
            });
    },
};
