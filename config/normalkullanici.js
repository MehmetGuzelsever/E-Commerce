const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Normal Kullnıcı için MongoDB Şeması
const normalKullanici = new Schema({
    k_email:{
        type: String,
        unique: true,
        required: true
    },    
    k_adi:{
        type: String,
        required: true
    },
    k_soyadi:{
        type: String,
        required: true
    },
    k_password:{
        type: String,
        required: true
    },
    k_il:{
        type: String,
        required: true
    },
    k_ilce:{
        type: String,
        required: true
    }                  
});


//Normal Kullanıcı için MongoDB Modeli
module.exports = mongoose.model('USER', normalKullanici);