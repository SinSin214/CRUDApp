const userService = require('./userService');

module.exports = {
    getAll: function getAll(req, res) {
        userService.getAll()
            .then(users => res.json(users))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    getById: function getById(req, res) {
        userService.getById(req.params.id)
            .then(user => res.json(user))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    create: function create(req, res) {
        userService.create(req.body)
            .then(() => res.json({ message: 'User created' }))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    update: function update(req, res) {
        userService.update(req.params.id, req.body)
            .then(() => res.json({ message: 'User updated' }))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    _delete: function _delete(req, res) {
        userService.delete(req.params.id)
            .then(() => res.json({ message: 'User deleted' }))
            .catch((err) => {
                res.status(500).send(err);
            });
    }
};










