var request = require('request');
var he = require('he');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

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
    var docs = mc_divStaff.match(/(<h4.*?\/h4>)/g); //Array of dogturds
    var ids = mc_divStaff.match(/(data-id=".*?")/g); //Array of their data IDs
    var mapped = [];
    for (i = 0; i < docs.length; i++) {
        let temp = {
            "name": he.decode(docs[i].match(/(?<=>)(.*?)(?=<)/)[0].toString()),
            "id": ids[i].match(/(?<=")(.*?)(?=")/).toString(),
            "room": ""
        };
        db.get('dentists').push(temp).write();
        mapped.push(temp);
    }
    /*for (var key in mapped) {
        if (Object.prototype.hasOwnProperty.call(mapped, key)) {
            id = mapped[key].match(/(?<=")(.*?)(?=")/).toString();
            db.set(`dentists.${key}`, id).write();
        }
    }*/
    console.log(mapped);
    db.set('dentists', mapped).write();
    console.log(db.get('dentists').value());

}

getDentists();