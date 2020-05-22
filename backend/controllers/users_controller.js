const User = require('../model/user_model')

exports.user = async(req, res, next) => {
    const user = await User.find();
    res.json(user)
};
