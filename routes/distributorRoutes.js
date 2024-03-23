var express = require('express');
var router = express.Router();
const modelDistributor = require('../models/distributors')

// get users listing
router.get('/test', function(req, res, next){
    res.send('respond with a resource distributor test');
});

//add data
router.post('/add', async(req, res) => {
    try{
        const model = new modelDistributor(req.body)
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
router.get('/list', async(req, res) => {
    const result = await modelDistributor.find({})
    try{
        res.send(result)
    }catch(error){
        console.log(error);
    }
})

router.get('/getbyid/:id', async(req, res) => {
    
    try{
        const result = await modelDistributor.findById(req.params.id)
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
        const result = await modelDistributor.findByIdAndUpdate(req.params.id, req.body)
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
        const result = await modelDistributor.findByIdAndDelete(req.params.id)
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