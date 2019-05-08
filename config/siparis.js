const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Siparişler için MongoDB Şeması
const siparis = new Schema({
    siparis_edilen:{
        type: String,
        required: true
    },
    siparis_eden:{
        type: String,
        required: true
    },    
    siparis_alan:{
        type: String,
        required: true
    },
    siparis_tarih:{
        type: Date,
        required: true
    },
    siparis_teslim_tarih:{
        type: Date,
        required: true
    },
    siparis_aciklama:{
        type: String
    },
    siparis_tutar:{
        type: Number,
        required: true
    },
    siparis_confirm:{
        type: Boolean,
        required: true,
        default: false
    }                            
});


//Siparis MongoDB Modeli
module.exports = mongoose.model('SIPARIS', siparis);