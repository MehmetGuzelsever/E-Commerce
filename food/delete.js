'use strict';

//Food Import
const Food = require("../config/yemek");

module.exports = function (info, callback) {
    if (info.email == null || info.id == null) {
        const js = {
            success:    false,
            msg:        "Eksik Bilgi."
        };
        callback(js);            
    }
    else {
        Food.deleteOne({ _id: info.id }, function(err) {
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
                    msg:        "Silme Başarılı."
                };            
                callback(null, js);                
            }            
        })
    }
}
