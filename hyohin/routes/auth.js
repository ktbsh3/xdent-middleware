var express = require('express');
var router = express.Router();
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
var form;
var cookieman = require('../rqstors/cookieman');

db.defaults({ auth: {}, dentists: [], rooms: [] }).write();

router.get('/', (req, res, next) => {
    res.render('auth');
});
router.post('/test', (req, res, next) => {
    console.log("something posted to /test");
    form = JSON.parse(JSON.stringify(req.body));
    db.set('auth', form).write();
    cookieman.getCookies(db);
    res.send("OK");
    res.end();

}
);

module.exports = router;