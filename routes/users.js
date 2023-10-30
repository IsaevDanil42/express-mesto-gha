const users = require('express').Router();
const {
  createUser, getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

users.post('', createUser);

users.get('', getUsers);

users.get('/:userId', getUserById);

users.patch('/me', updateProfile);

users.patch('/me/avatar', updateAvatar);

module.exports = users;
