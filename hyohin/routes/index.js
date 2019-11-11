var express = require('express');
var router = express.Router();
var fs = require('fs');
var app = require('../app.js');
var db = require('../database');
var dentistman = require('../rqstors/dentistman');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rooms = db.get('rooms').value();
  let auth = db.get('auth').value();
  let dentists = db.get('dentists').value();
  let opstatus = req.query.opstatus;
  res.render('index', { opstatus: opstatus, title: "Hue Control", message: "Nastaveni adapteru", rooms: rooms,
  auth: auth, dentists: dentists});
});

router.get('/updatelist', function (req, res, next) {
  dentistman( (rs) => {
    let opstatus = encodeURIComponent(rs);
    console.log(opstatus);
    res.redirect('/?opstatus=' + opstatus);
  });
});
router.post('/updaterooms', function (req, res, next) {
  form = JSON.parse(JSON.stringify(req.body));
  console.log(form);
  console.log("AAAA");
  for (var i = 0; i <4; i++) {
    db.set(`rooms[${i}].dentist`, form.lekari[i]).write();
  }
  res.redirect('/');
});

module.exports = router;
