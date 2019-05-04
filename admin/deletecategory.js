'use strict';

//Category Import
const Category = require("../config/kategori");

//Food Import
const Food = require("../config/yemek");

module.exports = function (info, callback) {
    if (info.category_adi == null) {
        const js = {
            success:    false,
            msg:        "Lütfen Kategori Adını Giriniz."
        };
        callback(js);          
    }
    else {
        Category.deleteOne({ category_adi: info.category_adi }, function(err) {
            if (err) {
                const js = {
                    success:    false,
                    msg:        err
                };            
                callback(js);
            }
            else {
                Food.deleteMany({ y_cesit: info.category_adi }, function(err) {
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
                            msg:        "Kategori ve ona bağlı yemekler Silindi."
                        };            
                        callback(null, js);                
                    }                      
                })              
            }            
        })        
    }
}
