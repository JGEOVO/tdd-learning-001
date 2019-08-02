const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({
  email: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
