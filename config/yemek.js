const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Yemekler için MongoDB Şeması
const yemek = new Schema({
    y_adi:{
        type: String,
        required: true
    },    
    y_evhanimi:{
        type: String,
        required: true
    },
    y_cesit:{
        type: String,
        required: true
    },
    y_fiyat:{
        type: Number,
        required: true
    },
    y_aciklama:{
        type: String
    },
    y_il:{
        type: String,
        required: true
    },
    y_ilce:{
        type: String,
        required: true
    },                       
});


//Yemekler için MongoDB Modeli
module.exports = mongoose.model('YEMEK', yemek);