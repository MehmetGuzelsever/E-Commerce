'use strict';

//Ev Hanımı Modeli
const HOUSEWIFE  = require('../config/evhanimi');

module.exports = function (info, callback) {
    var housewife = new HOUSEWIFE();
    housewife.e_email    = info.email;
    housewife.e_adi      = info.adi;
    housewife.e_soyadi   = info.soyadi;
    housewife.e_password = info.password;
    housewife.e_il       = info.il;
    housewife.e_ilce     = info.ilce;
    housewife.e_adres    = info.adres;


    if (info.email == null || info.adi == null || info.soyadi == null || info.password == null || info.adres == null) {
        const js = {
            success:    false,
            msg:        "Ev Hanımı E-Posta, İsim, Soyisim, Adres veya Şifre Boş Geçilemez."
        };
        callback(js);
    }
    else {
        housewife.save(function (err) {
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