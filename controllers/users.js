const User = require('../models/user');

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные при создании пользователя',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => { res.status(200).send(users); })
    .catch(() => {
      res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь по указанному _id не найден',
        });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (req.params.userId.length !== 24) {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь по указанному _id не найден',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные при обновлении профиля',
        });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь с указанным _id не найден',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные при обновлении аватара',
        });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь с указанным _id не найден',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};
