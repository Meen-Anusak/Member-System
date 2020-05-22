const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
    name: String,
    age: Number
})

const User = mongoose.model('users', usersSchema);


module.exports = User;
