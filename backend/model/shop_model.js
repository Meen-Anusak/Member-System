const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shopSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        default: 'no-image.png'
    },
    location: {
        lat: Number,
        lgn: Number
    }
}, {
    toJSON: { virtuals: true },
    timestamps: true
});

shopSchema.virtual('menus', {
    ref: 'menus',
    localField: '_id',
    foreignField: 'shop'
})

const shop = mongoose.model('shops', shopSchema);


module.exports = shop;
