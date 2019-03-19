const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Ev Hanımı için MongoDB Şeması
const evHanimi = new Schema({
    e_email:{
        type: String,
        unique: true,
        required: true
    },    
    e_adi:{
        type: String,
        required: true
    },
    e_soyadi:{
        type: String,
        required: true
    },
    e_password:{
        type: String,
        required: true
    },
    e_il:{
        type: String,
        required: true
    },
    e_ilce:{
        type: String,
        required: true
    },
    e_adres:{
        type: String,
        required: true
    }                      
});


//Ev Hanımı için MongoDB Modeli
module.exports = mongoose.model('EvHanimi', evHanimi);