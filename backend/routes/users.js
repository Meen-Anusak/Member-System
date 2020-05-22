const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/users_controller');

/* GET users listing. */
router.get('/', user_controller.user)
module.exports = router;
