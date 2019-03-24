const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const brcypt    = require('bcrypt');

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

normalKullanici.pre('save',function(next){
    var kullanici =this;
    brcypt.genSalt(10,function(err,salt){
        if(err) return next(err);   
        brcypt.hash(kullanici.k_password,salt,function(err,hash){
            if(err){
                return next(err);
                console.log("Hash Hatası");
            }

            kullanici.k_password=hash;
                console.log(kullanici.k_email+"E-Mailine Sahip Kullanıcının Şifresi Hashlendi.");
                next();
            
        });
    });
});


//Normal Kullanıcı için MongoDB Modeli
module.exports = mongoose.model('USER', normalKullanici);