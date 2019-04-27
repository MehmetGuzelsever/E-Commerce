'use strict';

//Category Modeli
const category  = require('../config/kategori');

module.exports = function (info, callback) {
    category.find({},function(err,categorys){
        if(err){
            const js = {
                success :   false,
                msg:        "Sunucu Hatası."
            };
            callback(js);   
        }
        else if (categorys) {
            const js = {
                success:    true,
                msg:        "Kategoriler Bulundu",
                data:       categorys
            };
            callback(null, js);              
        }
    });        
}
