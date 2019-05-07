'use strict';

//Siparis Modeli
const Order  = require('../config/siparis');

module.exports = function (info, callback) {
    if (info.email == null) {
        const js = {
            success:    false,
            msg:        "Yetkilendirme Hatası."
        };
        callback(js);            
    }
    else {
        Order.find({ siparis_alan: info.email }, function(err, Orders) {
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
                    msg:        "Siparisler Gönderildi.",
                    data:       Orders
                };
                callback(null, js);                
            }             
        })        
    }
}



