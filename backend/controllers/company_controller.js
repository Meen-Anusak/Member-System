const Company = require('../model/compant_model');

exports.findCompany = async(req, res, next) => {
    const company = await Company.find()
    res.json(company)
}

exports.addCompany = async(req, res, next) => {
    const { name, province } = req.body;
    let company = await new Company({
        name: name,
        address: {
            province: province
        }
    })
    await company.save()
    res.status(201).json(company);
}

exports.findID = async(req, res, next) => {
    const { id } = req.params;
    try {
        const company = await Company.findById(id)
        if (!company) {
            throw new Error
        }
        res.json(company)

    } catch (error) {
        res.status(400).json({ message: 'เกิดข้อผิดพลาด ' })
    }
}
exports.deleteCompany = async(req, res, next) => {
    const { id } = req.params;
    try {
        const delcompany = await Company.findByIdAndDelete(id)
        if (!delcompany) throw new Error('ไม่พบผู้ใช้งานนี้ในระบบ')
        res.status(200).json({ message: 'ลบข้อมูลเรียบร้อย' })
    } catch (error) {
        res.status(400).json(error.message)
    }
}
exports.updateCompany = async(req, res, next) => {
    const { id } = req.params;
    const { name, province } = req.body;
    try {
        const update = await Company.findByIdAndUpdate(id, {
            name: name,
            address: {
                province: province
            }
        })
        if (!update) throw new Error('ไม่พบผู้ใช้งานนี้ในระบบ')
        res.status(200).json({ message: 'แก้ไขข้อมูลเรียบร้อย' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
