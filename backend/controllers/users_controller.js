const User = require('../model/user_model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../configs/env');
const save_image = require('../configs/base64_image')


exports.user = async(req, res, next) => {

    try {
        const user = await User.find();
        res.status(200).json({ user, usertotal: user.length })
    } catch (error) {
        next(error)
    }
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

        const { firstname, lastname, email, password, role } = req.body;

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
        user.image = config.DOMAIN + '/' + 'images/nopic.png'
        user.password = await user.encryptPassword(password);
        user.role = role || 'Student'

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

exports.profile = async(req, res, next) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        next(error)
    }
}

exports.updateProfile = async(req, res, next) => {
    try {
        const { firstname, lastname, image } = req.body;

        let user = await User.findByIdAndUpdate(req.user.id);
        user.firstname = firstname
        user.lastname = lastname;
        user.image = await save_image.saveImageToDisk(image)
        await user.save();

        res.status(201).json({ message: 'แก้ไขข้อมูลเรียบร้อย' });

    } catch (error) {
        next(error)
    }
}

exports.changePassword = async(req, res, next) => {
    try {

        const { old_pass, new_pass } = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await user.checkPassword(old_pass, user.password);


        if (!isMatch) {
            const error = new Error('รหัสผ่านเดิมไม่ถูกต้อง')
            error.statusCode = 401;
            throw error
        }
        user.password = await user.encryptPassword(new_pass);
        await user.save();

        res.status(201).json({ message: 'เปลียนรหัสผ่านเรียบร้อย' });

    } catch (error) {
        next(error)
    }
}

exports.getUserById = async(req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error('ไม่พบผู้ใช้งานในระบบ')
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

exports.updateUser = async(req, res, next) => {
    try {
        const { firstname, lastname, image, role } = req.body;

        let user = await User.findByIdAndUpdate(req.params.id);

        user.firstname = firstname
        user.lastname = lastname;
        user.role = role
        user.image = image || await save_image.saveImageToDisk(image)
        await user.save();

        res.status(200).json({ message: 'แก้ไขข้อมูลเรียบร้อย' });

    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        console.log(user);

        res.status(200).json({ message: 'ลบข้อมูลเรียบร้อย' })


    } catch (error) {

    }
}
