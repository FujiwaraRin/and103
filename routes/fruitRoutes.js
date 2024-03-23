var express = require('express');
var router = express.Router();
const modelFruit = require('../models/fruits')
const Upload = require('../config/upload')
const JWT = require('jsonwebtoken')
const SECRECT_KEY = "HaoLD"

// get users listing
router.get('/test', function(req, res, next){
    res.send('respond with a resource fruit test');
});

//add data
router.post('/add', Upload.array('images', 5), async(req, res)=>{
    try{
        const {files} =req
        const urlImages = files.map((file) => `${req.protocol}: //${req.get('host')}/uploads/${file.filename}`)
        const model = new modelFruit(req.body)
        model.images = urlImages
        const result = await model.save();// them du lieu vao db
        if(result){
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
router.get('/list', async(req, res) =>{
    try{
        const authHeader = req.headers['authorization']
        console.log('authHeader', authHeader);
        const token = authHeader && authHeader.split(' ')[1]
        if(!token) return res.sendStatus(401)
        let payload
        JWT.verify(token, SECRECT_KEY, (err, _payload)=>{
            if(err instanceof JWT.TokenExpiredError) return res.sendStatus(401)
            if(err ) return res.sendStatus(403)
            payload = _payload
        })
        const result = await modelFruit.find().populate('id_distributors')
        res.send(result)
    }catch(error){
        console.log(error);
    }
})

router.get('/getListByPrice', async(req, res) => {
   
    try{
        const {start , end } = req.query
        const query = {price: {$gte: start, $lte: end}}
        console.log(query);
        const result = await modelFruit.find(query, 'name price quantity id_distributors')
                                          .populate('id_distributors')  
                                          .sort({quantity: -1})  
                                          .skip(0)   
                                          .limit(3)
        res.send(result)
    }catch(error){
        console.log(error);
    }
})


router.get('/getbyid/:id', async(req, res) => {
    
    try{
        const result = await modelFruit.findById(req.params.id).populate('id_distributors')
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
        const result = await modelFruit.findByIdAndUpdate(req.params.id, req.body)
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
        const result = await modelFruit.findByIdAndDelete(req.params.id)
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