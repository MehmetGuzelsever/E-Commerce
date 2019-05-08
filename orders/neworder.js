'use strict';

//Siparis Modeli
const ORDER  = require('../config/siparis');

module.exports = function (info, callback) {
    var Order = new ORDER();
    Order.siparis_edilen = info.yemek_adi;
    Order.siparis_eden = info.user;
    Order.siparis_alan = info.evhanimi;
    Order.siparis_tarih = info.siparis_tarihi;
    Order.siparis_teslim_tarih = info.teslim_tarihi;
    Order.siparis_aciklama = info.siparis_aciklama;
    Order.siparis_tutar = info.siparis_tutar;

    if (info.yemek_adi == null || info.user == null || info.evhanimi == null || info.siparis_tarihi == null
        || info.teslim_tarihi == null || info.siparis_tutar == null) {
            const js = {
                success :   false,
                msg:        "Sipariş Oluşturulmadı Sipariş İçin Eksik Bilgi."
            };
            callback(js);            
        }
        else {
            Order.save(function (err, data) {
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
                        msg:        "Sipariş Oluşturuldu.",
                        info:       data._id
                    };
                    callback(null,js);
                }
            })            
        }
}