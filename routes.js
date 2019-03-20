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
    res.json({"msg":"Welcome to E-Commerce api"});
})


//Export Router
module.exports=router;