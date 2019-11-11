var request = require('request');
var db = require('../database');
var cheerio = require('cheerio');
var he = require('he');

function initColors() {
    let options = {
        method: 'GET',
        url: 'https://app.xdent.cz/Settings/Service/',
        headers: {
            'Cookie': db.get('auth.cookies').value()
        }
    };

    request(options, (err, res, body) => {
        getColors(res.body);
    });
}

function setColors(time) {
    let dentos = db.get('dentists').value();
    let ActiveEvents;
    for (let i = 0; i < dentos.length; i++) {

    }

}

function getColors(body) {
    var $ = cheerio.load(body)
    let serviceList = $('#mc_divService').html();
    let serviceName = serviceList.match(/(<h4>.*?<\/h4>)/g);
    let serviceColor = serviceList.match(/(background-color:.*?;)/g);
    let colorArray = {};
    for (let i = 0; i < serviceName.length; i++) {
        let str = he.decode(serviceName[i]).substring(4);
        colorArray[str.substring(0, str.length -5)] = serviceColor[i];
    }
    db.set('colormap', colorArray).write();

}

setColors(new Date().toISOString().split("T")[0]);