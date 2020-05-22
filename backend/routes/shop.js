var express = require('express');
var router = express.Router();
const shop_controller = require('../controllers/shop_controller')
    /* GET home page. */
router.get('/', shop_controller.getShop)
router.get('/menu', shop_controller.getMenu)
router.get('/:id', shop_controller.getShopWithMenu)
router.post('/', shop_controller.insertShop)
router.delete('/:id', shop_controller.deleteShop)
module.exports = router;
