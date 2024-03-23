const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Fruits = new Scheme({
    name: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    status: {type: Number},// status = 1 => còn hàng, 0 => hết hàng, -1 => ngừng kinh doanh 
    images: {type: Array},// kiểu dữ liệu danh sách 
    description: {type: String},
    id_distributors: {type: Scheme.Types.ObjectId, ref: 'distributors'},
},{
    timestamps: true
})

module.exports = mongoose.model('fruits', Fruits)