const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(500).send({
        message: 'Что-то пошло не так',
      });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => { res.status(200).send(users); })
    .catch(() => {
      res.status(500).send({
        message: 'Что-то пошло не так',
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Пользователь по указанному _id не найден',
        });
      }
      return res.status(500).send({
        message: 'Что-то пошло не так',
      });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: ' Переданы некорректные данные при обновлении профиля',
        });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Пользователь с указанным _id не найден',
        });
      }
      return res.status(500).send({
        message: 'Что-то пошло не так',
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({
          message: 'Пользователь с указанным _id не найден',
        });
      }
      return res.status(500).send({
        message: 'Что-то пошло не так',
      });
    });
};