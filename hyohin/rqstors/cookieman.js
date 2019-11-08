var request = require('request');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);

function getCookies(login, pwd ) {
    var options = {
        method: 'POST',
        url: 'https://app.xdent.cz/Account/Login.aspx',
        qs: { ReturnUrl: '%2fCalendar%2f' },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKLTgwOTAyNjU2NGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFHWN0bDAwJG1jJExvZ2luVXNlciRSZW1lbWJlck1l9%2FlfiOgpyM6CgXCJA%2FJGDg25CqyXFMmTJ5OnNHbuRnM%3D&__VIEWSTATEGENERATOR=CD85D8D2&__SCROLLPOSITIONX=0&__SCROLLPOSITIONY=0&__EVENTVALIDATION=%2FwEdAAXciRx3%2BPzSUXGcvNMHLXXIKHf0QCfnH6iEMgNzJrjaP8nrMRR3LHJ%2BPOY90uPsXLl7SBUcOQ26sKRQrkyG6XqQNojspLyp7IWi6hMyyJghmYy%2FSC8SWE8Hgr8rYlc76TQ%2Fyx%2FePzjbtMCa0kLubw0t&ctl00%24mc%24LoginUser%24UserName=${login}&ctl00%24mc%24LoginUser%24Password=${pwd}&ctl00%24mc%24LoginUser%24LoginButton=P%C5%98IHL%C3%81SIT`
    };
    console.log(login, pwd);
    request(options, function (err, res, body) {
        if (err) throw new Error(err);
        kuki = condenseCookies(res.headers["set-cookie"]);
        db.set('auth.cookies', kuki).write();
        console.log(kuki);

    });
}

function condenseCookies(cookieArray) {
    cookieArray.forEach( (cookie, i) => {
        cookieArray[i] = cookie.slice(0, cookie.indexOf(";"));
    })
    return cookieArray.join(";");
}

module.exports = {getCookies};
