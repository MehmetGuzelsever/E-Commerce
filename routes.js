const express = require("express");
const router  = express.Router();

//Services
const auth      = require("./authenticate/index");
const account   = require("./accounts/index");
const admin     = require("./admin/index");
const categoty  = require("./category/index");
const food      = require("./food/index");
const orders    = require("./orders/index");

//for Access Token
const jwt    = require("jsonwebtoken");
const secret = "mehmetguzelsever";

//Initial Request
router.get('/', function(req, res) {
    res.json({msg:"Welcome to E-Commerce api"});
})

//Normal Kullanıcı Register
router.post('/user/register', function(req, res) {
    auth.user(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Ev Hanımı Register
router.post('/housewife/register', function(req, res) {
    auth.housewife(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Admin Register
router.post('/admin/register', function(req, res) {
    auth.admin(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Kullanıcı Login
router.post('/user/login', function(req, res) {
    auth.userLogin(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Ev Hanımı Login
router.post('/housewife/login', function(req, res) {
    auth.evlogin(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Admin Login
router.post('/admin/login', function(req, res) {
    auth.adminLogin(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Access Token Verify
router.use(function(req, res, next) {
    var token =  req.headers['x-access-token'];

    if (token) {
        //verify
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Token Doğrulama Hatası'
                })
            }
            else {
                req.decoded = decoded;
                next();
            }
          });
    }
    else {
        res.json({
            success: false,
            message: "Token Bulunamadı."
        })
    }
})

//deneme request
router.post('/me', function(req, res) {
    res.send(req.decoded);
})

//User Update
router.post('/user/update', function(req, res) {
    account.userUpdate(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//User Food Listing
router.post('/user/food/listing', function(req, res) {
    food.userfoods(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Housewife Update
router.post('/housewife/update', function(req, res) {
    account.housewifeUpdate(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Housewife Food Adding
router.post('/housewife/food/adding', function(req, res) {
    food.adding(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Housewife Food Listing
router.post('/housewife/food/listing', function(req, res) {
    food.listing(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Housewife Food list
router.post('/housewife/food/one', function(req, res) {
    food.onefood(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Housewife Food Updating
router.post('/housewife/food/update', function(req, res) {
    food.update(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Housewife Food Deleting
router.post('/housewife/food/delete', function(req, res) {
    food.delete(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Admin Category Adding
router.post('/admin/category/adding', function(req, res) {
    admin.addCategory(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Admin Category getting
router.post('/category/get', function(req, res) {
    admin.getCategory(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Admin Category Updating
router.post('/admin/category/update', function(req, res) {
    admin.updatecategory(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Admin Category Deleting
router.post('/admin/category/delet', function(req, res) {
    admin.deletecategory(req.body, function (error, response) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(response);
        }
    })
})

//Export Router
module.exports=router;