'use strict';

//Category Model Import
const Category = require("../config/kategori");

//Food Model Import
const Food = require("../config/yemek");

module.exports = function (info, callback) {
    if (info.category_adi == null || info.newcategory_adi == null) {
        const js = {
            success:    false,
            msg:        "Lütfen Kategori Adını Giriniz."
        };
        callback(js);        
    }
    else {
        Category.findOneAndUpdate({category_adi: info.category_adi}, {category_adi: info.newcategory_adi})
        .exec(function(err) {
            if (err) {
                const js = {
                    success:    false,
                    msg:        err
                };            
                callback(js);
            }
            else {
                Food.updateMany({ y_cesit: info.category_adi }, { y_cesit: info.newcategory_adi })
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
                            msg:        "Kategori ve altındaki yemekler güncellendi."
                        };            
                        callback(null, js);                
                    }
                })            
            }
        })
    }
}
