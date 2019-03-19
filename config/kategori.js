const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

//Kategori için MongoDB Şeması
const category = new Schema({
    category_adi:{
        type: String,
        unique: true,
        required: true
    }                       
});


//Kategori için MongoDB Modeli
module.exports = mongoose.model('KATEGORI', category);