const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt    = require('bcrypt-nodejs');

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


//password hashing
normalKullanici.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.k_password, null, null, function(err,hash) {
        if (err) {
            return next(err);
        }
        else {
            user.k_password = hash;
            next();
        }
    })
});

//password compare
normalKullanici.methods.validPassword = function(candidatePassword) {
    if(this.k_password != null) {
        return bcrypt.compareSync(candidatePassword, this.k_password);
    } else {
        return false;
    }
};


//Normal Kullanıcı için MongoDB Modeli
module.exports = mongoose.model('USER', normalKullanici);