var request = require('request');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
var htmlparser = require('htmlparser2');

function getDentists() {
    let options = {
        method: 'GET',
        url: 'https://app.xdent.cz/Settings/Calendars/',
        headers:
            {
                'Cookie': db.get('auth.cookies').value()
            }
    };
    request(options, (err, res, body) => {
        extractSeeWhatIDidThere(res.body);
    })

}

function extractSeeWhatIDidThere(body) {
    var lines = body.split('\n');
    var i = 0;
    var mc_divStaff;
    lines.forEach((line, index) => {
        if (line.trim().startsWith('<div id="mc_divStaff">')) {
            mc_divStaff = line;
        }
    });
    var docs = mc_divStaff.match(/(<h4.*?\/h4>)/g);
    var ids = mc_divStaff.match(/(data-id=".*?")/g);
    var mapped = [];
    for (i = 0; i < docs.length; i++) {
        mapped[docs[i]] = ids[i];
    }
    console.log(mapped);
    db.set('dentists', mapped).write();

}

getDentists();