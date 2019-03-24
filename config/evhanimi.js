const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const brcypt    = require('bcrypt');

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

evHanimi.pre('save',function(next){
    var evhanimi =this;
    brcypt.genSalt(10,function(err,salt){
        if(err) return next(err);   
        brcypt.hash(evhanimi.e_password,salt,function(err,hash){
            if(err){
                return next(err);
                console.log("Hash Hatası");
            }

                evhanimi.e_password=hash;
                console.log(evhanimi.e_email+"E-Mailine Sahip Ev Hanımının Şifresi Hashlendi.");
                next();
            
        });
    });
});


//Ev Hanımı için MongoDB Modeli
module.exports = mongoose.model('EvHanimi', evHanimi);