var express = require('express');
var router = express.Router();
var fs = require('fs');

var data = fs.readFileSync("store/data.json");
var jsoned = JSON.parse(data.toString());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message: "HENLOL", data: jsoned });
});

module.exports = router;
