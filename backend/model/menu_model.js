const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    preice: { type: Number },
    shop: { type: Schema.Types.ObjectId, ref: 'shops' }
})
const menu = mongoose.model('menus', menuSchema);

module.exports = menu;
