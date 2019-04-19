'use strict';

//User Model Import
const User = require("../config/evhanimi");



module.exports = function (info, callback) {
    if (info.name == null || info.email == null || info.surname == null || info.il == null || info.ilce == null || info.adres == null ) {
        const js = {
            success:    false,
            msg:        "Lütfen Parametreleri Giriniz."
        };
        callback(js);
    }
    else {
        User.findOneAndUpdate({ e_email: info.email }, { e_adi: info.name, e_soyadi: info.surname, e_il: info.il, e_ilce: info.ilce, e_adres: info.adres })
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