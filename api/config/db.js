var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jdc_db'
});
conn.connect((err) => {
    if (!err) {
        console.log('Database connection is established');
    } else {
        console.log('Database connection is not established !')
    }
});
module.exports = conn;