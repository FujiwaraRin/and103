var express = require('express');
var router = express.Router();
const modelUser = require('../models/users')
const Transporter = require('../config/mail')
const Upload = require('../config/upload')

// get users listing
router.get('/test', function(req, res, next){
    res.send('respond with a resource user test');
});

//add data
router.post('/add', Upload.single('avatar'), async(req, res)=>{
    try{
        const {file} =req
        const urlImages = `${req.protocol}: //${req.get('host')}/uploads/${file.filename}`
        const model = new modelUser(req.body)
        model.avatar = urlImages
        const result = await model.save();// them du lieu vao db
        if(result){
            const mailOption = {
                from: 'gooyu03@gmail.com',
                to: model.email,//mail ng dung dang ky
                subject: 'Welcom to NodeJS',
                text: 'Chúc mừng bạn đã đăng ký thành công'
            }
            await Transporter.sendMail(mailOption)
            res.json({
                "status": 200,
                "messenger": "Thêm thành công",
                "data": result
            })
        }else
        {
            //Nếu thêm không thành công result null thông báo khong thành công 
            res.json({
                "status": 400,
                "messenger": "Lỗi, thêm không thành công",
                "data": []
            })
        }
        //res.send(result)
    }catch(error){
        console.log(error);
    }
})
router.get('/list', async(req, res) => {
    const result = await modelUser.find({})
    try{
        res.send(result)
    }catch(error){
        console.log(error);
    }
})

router.get('/getbyid/:id', async(req, res) => {
    
    try{
        const result = await modelUser.findById(req.params.id)
       if(result){
        res.send(result)
       }else{
        res.json({
            "status": 400,
            "messenger": "không tìm thấy id",
            "data": []
        })
       }
    }catch(error){
        if(error.name === 'CastError'){
            res.status(404).send('Invalid ID format')
        }else{
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    }
})

router.patch('/edit/:id', async(req, res) => {
    
    try{
        const result = await modelUser.findByIdAndUpdate(req.params.id, req.body)
       if(result){
        const rs = await result.save()
        res.send(rs)
       }else{
        res.json({
            "status": 400,
            "messenger": "không tìm thấy id",
            "data": []
        })
       }
    }catch(error){
        if(error.name === 'CastError'){
            res.status(404).send('Invalid ID format')
        }else{
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    }
})

router.delete('/delete/:id', async(req, res) => {
    
    try{
        const result = await modelUser.findByIdAndDelete(req.params.id)
       if(result){
        res.json({
            "status": 400,
            "messenger": "xoa thanh cong",
            "data": result
        })
       }else{
        res.json({
            "status": 400,
            "messenger": "xoa that bai",
            "data": []
        })
       }
    }catch(error){
        if(error.name === 'CastError'){
            res.status(404).send('Invalid ID format')
        }else{
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    }
})

module.exports = router;