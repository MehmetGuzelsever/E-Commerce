'use strict';

//Food Modeli
const food  = require('../config/yemek');

module.exports = function (info, callback) {
    if (info.il == null || info.ilce == null) {
        const js = {
            success:    false,
            msg:        "Parametre Hatası İl ve İlçe Seçilmemiş."
        };
        callback(js);        
    }
    else {
        food.find({ y_il: info.il, y_ilce: info.ilce }, 'y_adi y_evMail y_cesit y_fiyat y_aciklama y_il y_ilce', function(err, Food) {
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
                    msg:        "Yemekler Bulundu.",
                    data:       Food
                };
                callback(null, js);                
            }             
        })

    }    
}