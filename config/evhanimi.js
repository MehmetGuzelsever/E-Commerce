const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt    = require('bcrypt-nodejs');

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
    },
    permission:{
        type: String,
        required: true,
        default: 'housewife'
    }                            
});

//password hashing
evHanimi.pre('save', function(next) {
    var ev = this;
    bcrypt.hash(ev.e_password, null, null, function(err,hash) {
        if (err) {
            return next(err);
        }
        else {
            ev.e_password = hash;
            next();
        }
    })
});

//password compare
evHanimi.methods.validPassword = function(candidatePassword) {
    if(this.e_password != null) {
        return bcrypt.compareSync(candidatePassword, this.e_password);
    } else {
        return false;
    }
};


//Ev Hanımı için MongoDB Modeli
module.exports = mongoose.model('EvHanimi', evHanimi);