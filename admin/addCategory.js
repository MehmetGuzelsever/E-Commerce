'use strict';

//Category Modeli
const CATEGORY  = require('../config/kategori');

module.exports = function (info, callback) {
    var category = new CATEGORY();
    category.category_adi = info.adi;

    if (info.adi == null) {
        const js = {
            success :   false,
            msg:        "Lütfen Kategori Adını Giriniz."
        };
        callback(js);        
    }
    else {
        category.save(function (err) {
            if(err) {
                const js = {
                    success:    false,
                    msg:        "Bu Kategori Zaten var."
                };
                callback(js);
            }
            else {
                const js = {
                    success:    true,
                    msg:        "Kategori Eklendi."
                };
                callback(null,js);
            }
        })        
    }
}