var express = require('express');
var router = express.Router();
const modelUser = require('../models/users')
const JWT = require('jsonwebtoken')
const SECRECT_KEY = "HaoLD"

// get users listing
router.post('/checkLogin', async(req, res)=>{
    try {
        const {username, password} =req.body
        const user = await modelUser.findOne({username, password})
        console.log(user);
        if(user){
            const token = JWT.sign({id: user._id}, SECRECT_KEY, {expiresIn: '1h'})
            const refreshToken = JWT.sign({id: user._id}, SECRECT_KEY, {expiresIn: '1d'})
            res.json({
                "status": 200,
                "message": "Đăng nhập thành công",
                "data": user,
                "token": token,
                "refreshToken": refreshToken
            })
        }else{
            res.json({
                "status": 400,
                "message": "Lỗi: Đăng nhập thất bại",
                "data": []
               
            })
        }
    } catch (error) {
        
    }
});

module.exports = router;