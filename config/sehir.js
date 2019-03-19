const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Şehirler için MongoDB Şeması
const sehir = new Schema({
    sehir_il:{
        type: String,
        required: true
    },
    sehir_ilce:{
        type: String,
        required: true
    }                       
});


//Şehirler için MongoDB Modeli
module.exports = mongoose.model('SEHIR', sehir);