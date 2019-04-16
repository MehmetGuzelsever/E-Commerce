'use strict';

//User Model Import
const User = require("../config/normalkullanici");



module.exports = function (info, callback) {
    if (info.name == null || info.email == null || info.surname == null || info.il == null || info.ilce == null ) {
        const js = {
            success:    false,
            msg:        "Lütfen Parametreleri Giriniz."
        };
        callback(js);
    }
    else {
        User.findOneAndUpdate({ k_email: info.email }, { k_adi: info.name, k_soyadi: info.surname, k_il: info.il, k_ilce: info.ilce })
        .exec(function (err, data) {
            if (err) {
                const js = {
                    success:    false,
                    msg:        err
                };            
                callback(js);
            }
            else {
                const js = {
                    success:    true,
                    msg:        "Update Başarılı."
                };            
                callback(null, js);                
            }
        })
    }
}