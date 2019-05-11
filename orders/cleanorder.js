'use strict';

//Order Modeli
const Order  = require('../config/siparis');

module.exports = function (info, callback) {
    if (info.id == null) {
        const js = {
            success :   false,
            msg:        "Sipariş Silinemedi. Eksik Bilgi."
        };
        callback(js);            
    }
    else {
        Order.deleteOne({ _id: info.id }, function(err) {
            if(err) {
                const js = {
                    success:    false,
                    msg:        err
                };
                callback(js);
            }
            else {
                const js = {
                    success:    true,
                    msg:        "Sipariş Temizlendi.",
                };
                callback(null,js);
            }
        }) 
    }
}