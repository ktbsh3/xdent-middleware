var db = require('../database');

function mapColorToEvents() {
    let activeevts = [];
    let colormap = db.get('colormap').value();
    // Vrati seznam lekaru s pritomnymi udalostmi
    let wat = db.get('dentists').filter('events').value();
    //console.log(wat);
    // Loop pro traverzovani seznamu lekaru
    for (let i = 0; i < wat.length; i++) {
        let dentist = wat[i];
        let events = wat[i].events;
        console.log(dentist.name + ` (id: ${dentist.id})` + ":\n" + events);
        // Projde seznam udalosti lekare, porovna casy a vrati aktivni udalost.
        for (let e = 0; e < events.length; e++) {
            let evt = events[e]; //
            //let time = new Date().toISOString().replace('T', ' ').split('.')[0];
            let time = new Date();
            var currentTimeOffset = time.getTimezoneOffset()*60000;
            time.setTime(time.getTime() - currentTimeOffset);
            time = time.toISOString().replace('T', ' ').split('.')[0];
            let start = evt.Start;
            let finish = evt.Finish;
            console.log("START:" + start + " NOW: " + time + " FINISH: " + finish + "   " + evt.ServiceName);
            if (time <= finish && time >= start) {
                console.log("#THIS IS ACTIVE, ASSIGNING COLOR: " + colormap[evt.ServiceName]);
                let room = db.get('rooms').find({ dentist: wat[i].id}).value();
                if (room) {
                    console.log(room.name);
                    activeevts.push([room.name, colormap[evt.ServiceName]]);
                }
            }
        }
    }
    return activeevts;
}

module.exports = {mapColorToEvent: mapColorToEvents};

mapColorToEvents();