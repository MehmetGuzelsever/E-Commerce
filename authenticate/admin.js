'use strict';

//Ev Hanımı Modeli
const ADMIN  = require('../config/admin');

module.exports = function (info, callback) {
    const adminKEY = 'mehmetguzelsever1907';

    var admin = new ADMIN();
    admin.a_email    = info.email;
    admin.a_adi      = info.adi;
    admin.a_soyadi   = info.soyadi;
    admin.a_password = info.password;


    if (info.email == null || info.adi == null  || info.soyadi == null  || info.password == null) {
        const js = {
            success:    false,
            msg:        "Admin E-Posta, İsim, Soyisim, Adres veya Şifre Boş Geçilemez."
        };
        callback(js);
    }
    else if (adminKEY == info.key) {
        admin.save(function (err) {
            if(err) {
                const js = {
                    success:    false,
                    msg:        "E-Posta zaten kayıtlı."
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
    else {
        const js = {
            success:    false,
            msg:        "Yetkiniz Yok."
        };
        callback(js);
    }
}