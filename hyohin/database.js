var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({ auth: {}, dentists: [], rooms: [{name: "Ordinace 1", dentist: ""},
        {name: "Ordinace 2", dentist: ""},
        {name: "Ordinace 3", dentist: ""},
        {name: "Ordinace 4", dentist: ""}] }).write();

module.exports = db;