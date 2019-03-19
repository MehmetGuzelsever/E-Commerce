const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Yorumlar için MongoDB Şeması
const yorum = new Schema({
    yorum_yapan:{
        type: String,
        required: true
    },
    yorum_alan:{
        type: String,
        required: true
    },    
    yorum_text:{
        type: String,
        required: true
    },
    yorum_tarih:{
        type: Date,
        required: true
    }                     
});


//Yorumlar MongoDB Modeli
module.exports = mongoose.model('YORUM', yorum);