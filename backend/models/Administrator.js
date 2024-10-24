const mongoose = require('mongoose');

const administratorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Administrator = mongoose.model('Administrator', administratorSchema);
module.exports = Administrator;
