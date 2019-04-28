'use strict';

//Food Modeli
const FOOD  = require('../config/yemek');

module.exports = function (info, callback) {
    var food = new FOOD();
    
    food.y_adi = info.adi;
    food.y_evMail = info.email;    
    food.y_cesit = info.cesit;
    food.y_fiyat = info.fiyat;
    food.y_aciklama = info.aciklama;
    food.y_il = info.il;
    food.y_ilce = info.ilce;        

    console.log('YEMEGİN ADI=>'+JSON.stringify(info))

    if (info.adi == null || info.email == null || info.cesit == null || info.fiyat == null || info.il == null || info.ilce == null) {
        const js = {
            success :   false,
            msg:        "Lütfen Gerekli Alanları Doldurun."
        };
        callback(js);        
    }
    else {
        food.save(function (err) {
            if(err) {
                const js = {
                    success:    false,
                    msg:        "Sunucu Hatası"
                };
                callback(js);
            }
            else {
                const js = {
                    success:    true,
                    msg:        "Yemek Kaydedildi."
                };
                callback(null,js);
            }
        })
    }    
}