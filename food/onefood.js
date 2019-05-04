'use strict';

//Food Modeli
const food  = require('../config/yemek');

module.exports = function (info, callback) {
    if (info.email == null || info.adi == null) {
        const js = {
            success:    false,
            msg:        "Eksik Bilgi."
        };
        callback(js);        
    }
    else {
        food.find({ y_evMail: info.email, y_adi: info.adi }, 'y_adi y_evMail y_cesit y_fiyat y_aciklama y_il y_ilce', function(err, Food) {
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
                    msg:        "Yemek Bulundu.",
                    data:       Food
                };
                callback(null, js);                
            }             
        })

    }
}