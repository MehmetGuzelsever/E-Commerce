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

//password hashing
admin.pre('save', function(next) {
    var ad = this;
    bcrypt.hash(ad.a_password, null, null, function(err,hash) {
        if (err) {
            return next(err);
        }
        else {
            ad.a_password = hash;
            next();
        }
    })
});

//password compare
admin.methods.validPassword = function(candidatePassword) {
    if(this.a_password != null) {
        return bcrypt.compareSync(candidatePassword, this.a_password);
    } else {
        return false;
    }
};


//Admin için MongoDB Modeli
module.exports = mongoose.model('ADMIN', admin);