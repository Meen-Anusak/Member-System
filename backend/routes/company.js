const express = require('express');
const router = express.Router();
const company_controller = require('../controllers/company_controller');

router.get('/', company_controller.findCompany);

router.post('/addcompany', company_controller.addCompany);

router.get('/getcompany/:id', company_controller.findID);

router.delete('/delcompany/:id', company_controller.deleteCompany)

router.put('/updatecompany/:id', company_controller.updateCompany)

module.exports = router;
