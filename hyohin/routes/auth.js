var express = require('express');
var router = express.Router();
var db = require('../database');
var form;
var cookieman = require('../rqstors/cookieman');

router.get('/', (req, res, next) => {
    res.render('auth');
});
router.post('/update', (req, res, next) => {
    form = JSON.parse(JSON.stringify(req.body));
    db.set('auth', form).write();
    cookieman( function (rs) {
        let opstatus = encodeURIComponent(rs);
        res.redirect('/?opstatus=' + opstatus);
    });

}
);

module.exports = router;