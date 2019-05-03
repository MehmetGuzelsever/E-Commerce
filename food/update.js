'use strict';

//Food Import
const Food = require("../config/yemek");

module.exports = function (info, callback) {
    if (info.id == null || info.fiyat == null || info.aciklama == null) {
        const js = {
            success:    false,
            msg:        "Eksik Bilgi."
        };
        callback(js);        
    }
    else {
        Food.findOneAndUpdate({ _id: info.id }, { y_fiyat: info.fiyat, y_aciklama: info.aciklama })
        .exec(function(err, data) {
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
                    msg:        "Update Başarılı."
                };            
                callback(null, js);                
            }
        })
    }
}