const Shop = require('../model/shop_model')
const Menu = require('../model/menu_model')



exports.getShop = async(req, res, next) => {
    try {
        const shops = await Shop.find().select('name photo location');
        const shopDomain = await shops.map((shop) => {
            return {
                id: shop._id,
                name: shop.name,
                photo: `http://localhost:3000/images/${shop.photo}`,
                location: shop.location
            }
        })
        res.status(200).json(shopDomain)
    } catch (error) {

    }
}

exports.getMenu = async(req, res, next) => {
    try {
        const menu = await Menu.find().populate('shop')
        res.status(200).json(menu)
    } catch (error) {

    }
}

exports.getShopWithMenu = async(req, res, next) => {
    try {
        const { id } = req.params
        const shop = await Shop.findById(id).populate('menus');

        res.status(200).json(shop)


    } catch (error) {

    }
}

exports.insertShop = async(req, res, next) => {
    try {
        const { name, location } = req.body;
        let shop = new Shop({
            name: name,
            location: location
        })
        await shop.save()
        res.status(201).json({ message: 'เพิ่มข้อมูลเรียบร้อย' })
    } catch (error) {

    }
}

exports.deleteShop = async(req, res, next) => {
    try {
        const { id } = req.params;

        const deleteshop = await Shop.findByIdAndDelete(id);

        if (!deleteshop) throw new Error('ไม่มีร้านค้านี้ในระบบ')

        res.status(200).json({ message: 'ลบข้อมูลเรียบร้อย' })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
