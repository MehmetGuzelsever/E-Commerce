const express = require("express");
const router  = express.Router();

//Services
const auth      = require("./authenticate/index");
const admin     = require("./admin/index");
const categoty  = require("./category/index");
const food      = require("./food/index");
const orders    = require("./orders/index");

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
router.get('/housewife/login', function(req, res) {
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
router.get('/admin/login', function(req, res) {
    auth.adminLogin(req.body, function (error, response) {
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