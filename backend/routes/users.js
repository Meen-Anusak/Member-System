const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/users_controller');
const { body } = require('express-validator');

/* GET users listing. */
router.get('/', user_controller.user)

router.post('/register', [
    body('firstname').not().isEmpty().withMessage('กรุณาป้อนชื่อ'),
    body('lastname').not().isEmpty().withMessage('กรุณาป้อนนามสกุล'),
    body('email').not().isEmpty().withMessage('กรุณาป้อนอีเมล์').isEmail().withMessage('รูปแบบอีเมลล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().isLength({ min: 6 }).withMessage('พาสเวิด 6 ตัวอักษรขึ้นไป'),
], user_controller.register)

router.post('/login', user_controller.login)

module.exports = router;
