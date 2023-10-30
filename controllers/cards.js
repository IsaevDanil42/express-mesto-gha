const Card = require('../models/card');

const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const DEFAULT_ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => { res.send(cards); })
    .catch(() => {
      res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => { res.send(card); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (req.params.cardId.length !== 24) {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные',
        });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || req.params.cardId.length !== 24) {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные для постановки лайка',
        });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || req.params.cardId.length !== 24) {
        return res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные для снятии лайка',
        });
      }
      if (err.name === 'CastError') {
        return res.status(NOT_FOUND_CODE).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'На сервере произошла ошибка',
      });
    });
};
