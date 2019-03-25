'use strict';

//Normal Kullanıcı Modeli
const USER  = require('../config/normalkullanici');

module.exports = function (info, callback) {
    var user = new USER();
    user.k_email    = info.email;
    user.k_adi      = info.adi;
    user.k_soyadi   = info.soyadi;
    user.k_password = info.password;
    user.k_il       = info.il;
    user.k_ilce     = info.ilce;

    if (info.email == null || info.adi == null || info.soyadi == null || info.password == null) {
        const js = {
            success :   false,
            msg:        "Kullanıcı E-Posta, İsim, Soyisim veya Şifre Boş Geçilemez."
        };
        callback(js);
    }
    else {
        user.save(function (err) {
            if(err) {
                const js = {
                    success:    false,
                    msg:        "E-Posta zaten Kayıtlı."
                };
                callback(js);
            }
            else {
                const js = {
                    success:    true,
                    msg:        "Kayıt Başarılı."
                };
                callback(null,js);
            }
        })
    }
}