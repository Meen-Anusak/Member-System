const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
    firstname: { type: String, required: true, },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, trim: true }
}, { timestamps: true })

const User = mongoose.model('users', usersSchema);


module.exports = User;
