const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const brcypt    = require('bcrypt');

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

admin.pre('save',function(next){
    var admins =this;
    brcypt.genSalt(10,function(err,salt){
        if(err) return next(err);   
        brcypt.hash(admins.a_password,salt,function(err,hash){
            if(err){
                return next(err);
                console.log("Hash Hatası");
            }

            admins.a_password=hash;
                console.log(admins.a_email+"E-Mailine Sahip Adminin Şifresi Hashlendi.");
                next();
            
        });
    });
});


//Admin için MongoDB Modeli
module.exports = mongoose.model('ADMIN', admin);