const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')


const usersSchema = new Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, index: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, default: 'student' }
}, { timestamps: true });

usersSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
usersSchema.methods.checkPassword = async(password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

const User = mongoose.model('users', usersSchema);


module.exports = User;
