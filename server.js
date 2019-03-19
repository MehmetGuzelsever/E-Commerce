const express   = require("express");
const mongoose  = require("mongoose");
const morgan    = require("morgan");
const cors      = require("cors");
const bodyParse = require("body-parser");
const port      = 1907;


//Routes Import
const router = require("./routes");


//Express App
var app = express();


//NPM Module Using
app.use(morgan('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));
app.use(cors());


//Routes
app.use('/', router);

//NodeJS server (http://localhost:1907)
app.listen(port, function(err) {
    if (err) {
        console.log('Server Connection Error!!!');
    }
    console.log('Server Connected. Server Run on=>http://localhost:1907');
})