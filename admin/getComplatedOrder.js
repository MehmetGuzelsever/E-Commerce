'use strict';

//Siparis Modeli
const Order  = require('../config/complatedorder');

module.exports = function (info, callback) {
        Order.find({}, function(err, Orders) {
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
                    msg:        "Tamamlanan Siparişler Gönderildi.",
                    data:       Orders
                };
                callback(null, js);                
            }             
        })        
}



