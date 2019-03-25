'use strict';


//Ev Hanımı Modeli
const ev  = require('../config/evhanimi');


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
        ev.findOne({ e_email: info.email }).select('e_email e_password').exec(function (err, EvHanimi) {
            if (!EvHanimi) {
                const js = {
                    success:    false,
                    msg:        "Ev Hanımı Bulunamadı."
                };
                callback(js);
            }
            else if (EvHanimi) {
                var validPassword = EvHanimi.validPassword(info.password);
                console.log(validPassword)
                if (!validPassword) {
                    const js = {
                        success:    false,
                        msg:        "Ev Hanımı Şifresi Doğru Değil"
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