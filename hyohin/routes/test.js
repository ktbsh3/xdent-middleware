var express = require('express');
var router = express.Router();
var db = require('../database');
var mapper = require('../workers/mapper');



router.get('/', (req, res, next)=> {
    let colormap = db.get('colormap').value();
    let colorkey = Object.keys(colormap);
    let mappedcolors = mapper.mapColorToEvent();
    res.render('test', {colormap: colormap, colorkey: colorkey, mappedcolors: mappedcolors});
});

module.exports = router;
