var express = require('express');

var router = express.Router();

//Thêm model
const Distributors = require('../models/distributors')
const Fruits = require('../models/fruit');
//Api thêm distributor
router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body; // Lấy dữ liệu từ body
        const newDistributors = new Distributors ({
            name: data.name
    }); //Tạo một đối tượng mới
    const result = await newDistributors.save(); //Thêm vào database
    if (result)
    {   
        // Nếu thêm thành công result Inull trả về dữ liệu
        res.json({
            "status": 200,
            "messenger": "Thêm thành công",
            "data": result
        })
    }else
    {
        //Nếu thêm không thành công result null thông báo khong thành công 
        res.json({
            "status": 200,
            "messenger": "Lỗi, thêm không thành công",
            "data": []
        })
    }


    }catch (error) {
        console.log(error);
    }
});
module.exports = router;