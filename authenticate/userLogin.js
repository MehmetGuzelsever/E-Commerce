'use strict';


//Normal Kullanıcı Modeli
const user  = require('../config/normalkullanici');


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
        user.findOne({ k_email: info.email }).select('k_email k_password').exec(function (err, User) {
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
                    const js = {
                        success:    true,
                        msg:        "Login Başarılı."
                    };
                    callback(null, js);                
                }
            }        
        })
    }    
}