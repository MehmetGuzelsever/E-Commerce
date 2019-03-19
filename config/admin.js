const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Admin için MongoDB Şeması
const admin = new Schema({
    a_email:{
        type: String,
        unique: true,
        required: true
    },    
    a_adi:{
        type: String,
        required: true
    },
    a_soyadi:{
        type: String,
        required: true
    },
    a_password:{
        type: String,
        required: true
    }             
});


//Admin için MongoDB Modeli
module.exports = mongoose.model('ADMIN', admin);