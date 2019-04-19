'use strict';


//Ev Hanımı Modeli
const ev  = require('../config/evhanimi');

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
        ev.findOne({ e_email: info.email }).select('e_email e_password e_adi e_soyadi e_il e_ilce e_adres').exec(function (err, EvHanimi) {
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
                    const token = jwt.sign({ email: EvHanimi.e_email, name: EvHanimi.e_adi, surname:EvHanimi.e_soyadi, il:EvHanimi.e_il, ilce:EvHanimi.e_ilce, adres: EvHanimi.e_adres }, secret, { expiresIn: '2h' });
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