const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "gooyu03@gmail.com",
        pass: "wykc ypxy pkvx lzbr"
    }
})
module.exports = transporter