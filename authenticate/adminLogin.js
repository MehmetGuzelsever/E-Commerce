'use strict';


//Admin Modeli
const admin  = require('../config/admin');

//for Access Token
const jwt    = require('jsonwebtoken');
const secret = 'mehmetguzelsever';


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
        admin.findOne({ a_email: info.email }).select('a_email a_password a_adi a_soyadi permission').exec(function (err, Admin) {
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
                    const token = jwt.sign({ email: Admin.a_email, name: Admin.a_adi, surname: Admin.a_soyadi, permission: Admin.permission }, secret, { expiresIn: '2h' });             
                    const js = {
                        success:    true,
                        msg:        "Login Başarılı.",
                        token:      token
                    };
                    callback(null, js);               
                }
            }        
        })
    }    
}