var express = require('express');
var router = express.Router();
var db = require('../database');



router.get('/', (req, res, next)=> {
    let dentists = db.get('dentists').value();
    let colormap = db.get('colormap').value();
    let colorkey = Object.keys(colormap);
    mapColorToEvent();
    res.render('test', {colormap: colormap, colorkey: colorkey});
});

module.exports = router;

function mapColorToEvent() {
    let colormap = db.get('colormap').value();
    // Vrati seznam lekaru s pritomnymi udalostmi
    let wat = db.get('dentists').filter('events').value();
    // Loop pro traverzovani seznamu lekaru
    for (let i = 0; i < wat.length; i++) {
        let dentist = wat[i];
        let events = wat[i].events;
        console.log(dentist.name + ` (id: ${dentist.id})` + ":\n" + events);
        // Projde seznam udalosti lekare, porovna casy a vrati aktivni udalost.
        for (let e = 0; e < events.length; e++) {
            let evt = events[e];
            let testdate = "2019-11-13 12:00:00";
            let start = evt.Start;
            let finish = evt.Finish;
            console.log("START:" + start + " NOW: " + testdate + " FINISH: " + finish + "   " + evt.ServiceName);
            if (testdate <= finish && testdate >= start) {
                console.log("#THIS IS ACTIVE, ASSIGNING COLOR: " + colormap[evt.ServiceName]);
                let room = db.get('rooms').find({ dentist: wat[i].id}).value();
                if (room) {
                    console.log(room.name);
                }
            }
        }
    }
}

mapColorToEvent();