'use strict';


//Admin Modeli
const admin  = require('../config/admin');


module.exports = function (info, callback) {
    if (info.email == null) {
        const js = {
            success:    false,
            msg:        "Lütfen E-Postayı Giriniz."
        };
        callback(js);
    }
    else if (info.password == null) {
        const js = {
            success:    false,
            msg:        "Lütfen Şifreyi Giriniz."
        };
        callback(js);        
    }
    else {
        admin.findOne({ a_email: info.email }).select('a_email a_password').exec(function (err, Admin) {
            if (!Admin) {
                const js = {
                    success:    false,
                    msg:        "Admin Bulunamadı."
                };
                callback(js);
            }
            else if (Admin) {
                var validPassword = Admin.validPassword(info.password);
                console.log(validPassword)
                if (!validPassword) {
                    const js = {
                        success:    false,
                        msg:        "Admin Şifresi Doğru Değil"
                    };
                    callback(js);
                }
                else {
                    const js = {
                        success:    true,
                        msg:        "Login Başarılı."
                    };
                    callback(null, js);                
                }
            }        
        })
    }    
}