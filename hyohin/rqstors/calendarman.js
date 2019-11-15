var request = require('request');
var db = require('../database');

function pullEvents() {
    //var day = "2019-11-07";
    var day = new Date().toISOString().split("T")[0];
    let ids = db.get('dentists').map('id').value();
    ids.forEach( (id, index) => {
        ids[index] = ' "' + id + '"';
    });
    //console.log(ids);
    let options = {
        method: 'POST',
        url: 'https://app.xdent.cz/Calendar/Default.aspx/GetPrintData',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': db.get('auth.cookies').value()
        },
        body: `{'data':'{"Start":"${day} 00:00","End":"${day} 23:59","Resources":[${ids}]}'}`
    };
    //console.log(options.body);
    request(options,  (err, res, body) => {
        if (err) throw new Error(err);
        var calendar = JSON.parse(res.body);
        pushEvents(calendar.d);
    })
}

function pushEvents(data) {
    let numOfUsrs = data.length;
    //console.log(numOfUsrs);
    for (let i = 0; i < numOfUsrs; i++) {
        let entity = data[i];
        //console.log("Name: " + entity.ResourceName);
        //console.log("ID: " + entity.ResourceID);
        entity.Appointments.forEach( (evt) => {
            //console.log(evt)
        });
        db.get('dentists').find({ id: entity.ResourceID }).set('events', entity.Appointments).write();
    }
}

module.exports = {pullEvents};