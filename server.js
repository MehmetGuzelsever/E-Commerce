const express   = require("express");
const mongoose  = require("mongoose");
const morgan    = require("morgan");
const cors      = require("cors");
const bodyParse = require("body-parser");
const port      = 1907;


//Import Local 
const database = require('./config/database');

//Database Models
const user = require('./config/normalkullanici');
const evhanimi = require('./config/evhanimi');
const admin = require('./config/admin');
const yemek = require('./config/yemek');
const siparis = require('./config/siparis');
const yorum = require('./config/yorum');


//Routes Import
const router = require("./routes");


//Express App
var app = express();

//MongoDB Database Connection
mongoose.connect(database.db, {useNewUrlParser: true}, function(err) {
    if (err) {
        console.log("Database Connection Error!!!");
    }
    console.log("Database Connection");
});


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