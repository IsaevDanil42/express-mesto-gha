const users = require('express').Router();
const {
  createUser, getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

users.post('/users', createUser);

users.get('/users', getUsers);

users.get('/users/:userId', getUserById);

users.patch('users/me', updateProfile);

users.patch('/users/me/avatar', updateAvatar);

module.exports = users;
