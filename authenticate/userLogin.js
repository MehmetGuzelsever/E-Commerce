'use strict';


//Normal Kullanıcı Modeli
const user  = require('../config/normalkullanici');

//for Access Token
const jwt    = require('jsonwebtoken');
const secret = 'mehmetguzelsever';


module.exports = function (info, callback) {
    if (info.email == null) {
        const js = {
            success:    false,
            msg:        "Lütfen E-Postayı Giriniz."
        };
        callback(js);
    }
    else if (info.password == null) {
        const js = {
            success:    false,
            msg:        "Lütfen Şifreyi Giriniz."
        };
        callback(js);        
    }
    else {
        user.findOne({ k_email: info.email }).select('k_email k_password k_adi k_soyadi k_il k_ilce permission').exec(function (err, User) {
            if (!User) {
                const js = {
                    success:    false,
                    msg:        "Kullanıcı Bulunamadı."
                };
                callback(js);
            }
            else if (User) {
                var validPassword = User.validPassword(info.password);
                console.log(validPassword)
                if (!validPassword) {
                    const js = {
                        success:    false,
                        msg:        "Kullanıcı Şifresi Doğru Değil"
                    };
                    callback(js);
                }
                else {
                    const token = jwt.sign({ email: User.k_email, name: User.k_adi, surname:User.k_soyadi, il:User.k_il, ilce:User.k_ilce, permission:User.permission }, secret, { expiresIn: '2h' });             
                    const js = {
                        success:    true,
                        msg:        "Login Başarılı.",
                        token:      token
                    };
                    callback(null, js);                
                }
            }        
        })
    }    
}