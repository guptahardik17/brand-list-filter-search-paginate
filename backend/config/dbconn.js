const mysql = require('mysql');
const connection = mysql.createConnection({
	supportBigNumbers: true,
	bigNumberStrings: true,
	// host: 'localhost',
  // user: 'himaekuk_miclabu',
  // password : 'Labh2Mic$',
  // database : 'himaekuk_miclab'
	host: 'localhost',
  user: 'root',
  password : 'root',
  database : 'battlecode'
});

module.exports = connection;
