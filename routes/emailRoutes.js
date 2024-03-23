var express = require('express');
var router = express.Router();
const Transporter = require('../config/mail')

// get users listing
router.post('/test', function(req, res, next){
    const mailOption = {
        from: 'gooyu03@gmail.com',
        to: 'anlvdpd08117@fpt.edu.vn',
        subject: 'test mail',
        text: 'this is a test email send NodeJS project'
    }
    Transporter.sendMail(mailOption, function(error, info){
        if(error){
            res.status(500).json({error: "send mail fail" + error})
        } else{
            res.status(200).json({message: "send mail success" + info.response})
        }
    })
});


module.exports = router;