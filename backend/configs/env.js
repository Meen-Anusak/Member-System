require('dotenv').config();

module.exports = {
    MONGO_DB: process.env.MONGO_DB,
    DOMAIN: process.env.DOMAIN,
    JWT_SECRET: process.env.JWT_SECRET,
    DOMAIN_IMAGE: process.env.DOMAIN_IMAGE
}
