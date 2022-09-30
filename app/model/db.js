'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    port: process.env.DATABASE_PORT,
});

console.log("Db connected..." + process.env.DATABASE_SCHEMA );

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;