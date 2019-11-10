var express = require('express');
var router = express.Router();
var fs = require('fs');
var app = require('../app.js')
////db
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
////

var rooms = db.get('rooms').value();
var auth = db.get('auth').value();
var dentists = db.get('dentists').value();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Hue Control", message: "Nastaveni adapteru", rooms: rooms,
  auth: auth, dentists: dentists});
});

module.exports = router;
