const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '653d7c4e725e23784981eaf7',
  };

  next();
});
app.use('/', users);
app.use('/', cards);

app.listen(3000, () => {
  console.log(`App listening on port ${3000}`);
});
