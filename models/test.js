const db = require('./db');
var sql = `select mtype, down, look, img, title, text, rq from muban`;
db.query(sql)
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log(error);
    })