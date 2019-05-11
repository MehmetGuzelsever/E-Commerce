'use strict';

//Siparis Modeli
const Order  = require('../config/siparis');

module.exports = function (info, callback) {
    if (info.id == null || info.confirm == null) {
        const js = {
            success:    false,
            msg:        "Yetkilendirme Hatası."
        };
        callback(js);        
    }
    else {
        Order.findOneAndUpdate({ _id: info.id }, { siparis_confirm: info.confirm })
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
                    msg:        "Sipariş Onaylandı"
                };            
                callback(null, js);                
            }
        })        
    }
}