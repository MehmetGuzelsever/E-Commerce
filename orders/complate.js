'use strict';

//Complate Order Modeli
const COMPLATED  = require('../config/complatedorder');

//Order Modeli
const ORDER  = require('../config/siparis');


module.exports = function (info, callback) {
    var Order = new COMPLATED();
    Order.siparis_edilen = info.siparis_edilen;
    Order.siparis_eden = info.siparis_eden;
    Order.siparis_alan = info.siparis_alan;
    Order.siparis_tarih = info.siparis_tarih;
    Order.siparis_teslim_tarih = info.siparis_teslim_tarih;
    Order.siparis_aciklama = info.siparis_aciklama;
    Order.siparis_tutar = info.siparis_tutar;
    Order.siparis_confirm = info.siparis_confirm;

    if (info.siparis_eden == null || info.siparis_alan == null || info.siparis_tarih == null || info.siparis_teslim_tarih == null
        || info.siparis_tutar == null || info._id == null) {
            const js = {
                success :   false,
                msg:        "Sipariş Tamamlanamadı. Eksik Bilgi"
            };
            callback(js);            
        }
        else {
            Order.save(function (err, data) {       
                if (err) {
                    const js = {
                        success:    false,
                        msg:        err
                    };            
                    callback(js);                    
                }
                else {
                    ORDER.deleteOne({ _id: info._id }, function(err) {
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
                                msg:        "Sipariş Tamamlandı.",
                            };
                            callback(null,js);
                        }
                    })                       
                }      
            })            
        }
}
  