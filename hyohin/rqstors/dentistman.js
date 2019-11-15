var request = require('request');
var he = require('he');
var db = require('../database');

function getDentists(callback) {
    let options = {
        method: 'GET',
        url: 'https://app.xdent.cz/Settings/Calendars/',
        headers:
            {
                'Cookie': db.get('auth.cookies').value()
            }
    };
    request(options, (err, res, body) => {
        if (err) {
            callback(err)
        }
        else {
            callback(extractSeeWhatIDidThere(res.body));
        }
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
    if (mc_divStaff != null) {
        var docs = mc_divStaff.match(/(<h4.*?\/h4>)/g); //Array of dogturds
        var ids = mc_divStaff.match(/(data-id=".*?")/g); //Array of their data IDs
        var mapped = [];
        for (i = 0; i < docs.length; i++) {
            let temp = {
                "name": he.decode(docs[i].match(/(?<=>)(.*?)(?=<)/)[0].toString()),
                "id": ids[i].match(/(?<=")(.*?)(?=")/)[0].toString(),
            };
            db.get('dentists').push(temp).write();
            mapped.push(temp);
        }
        db.set('dentists', mapped).write();
        //console.log(db.get('dentists').value());
        return ("Seznam lékařů aktualizován.");
    }
    else {
        return("Nebyla nalezena odpověď serveru obsahující seznam lékařů, je platná autentikace?");
    }
}

module.exports = {getDentists};