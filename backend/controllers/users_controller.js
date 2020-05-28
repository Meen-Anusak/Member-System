const User = require('../model/user_model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../configs/env');

exports.user = async(req, res, next) => {
    const user = await User.find();
    res.json(user)
};

exports.register = async(req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลไม่ถูกต้อง');
            error.statusCode = 422;
            error.message = errors.array()
            throw error;
        }

        const { firstname, lastname, email, password } = req.body;

        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            const error = new Error('อีเมล์นี้มีผู้ใช้งานแล้ว');
            error.statusCode = 400;
            throw error;
        }

        let user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = await user.encryptPassword(password);

        await user.save();

        res.status(201).json({ message: 'ลงทะเบียนเรียบร้อย' })

    } catch (error) {
        next(error)
    }
}
exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body

        const checkUser = await User.findOne({ email: email });
        if (!checkUser) {
            const error = new Error('ไม่มีผู้ใช้งานนี้ในระบบในระบบ')
            error.statusCode = 404;
            throw error
        }
        const isMatch = await checkUser.checkPassword(password, checkUser.password)
        if (!isMatch) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง')
            error.statusCode = 401;
            throw error
        }

        const token = await jwt.sign({
            id: checkUser._id,
            role: checkUser.role
        }, config.JWT_SECRET, { expiresIn: '1 day' });

        const expiresIn = await jwt.decode(token);


        res.status(200).json({
            message: 'เข้าสู่ระบบสำเร็จ',
            acess_token: token,
            exp: expiresIn.exp,
            token_type: 'Bearer',
        })

    } catch (error) {
        next(error)
    }
}
