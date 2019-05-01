'use strict';

//Food Modeli
const food  = require('../config/yemek');

module.exports = function (info, callback) {
    if (info.email == null) {
        const js = {
            success:    false,
            msg:        "Yetkilendirme Hatası E-Posta yok."
        };
        callback(js);        
    }
    else {
        food.find({ y_evMail: info.email }, function(err, Food) {
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