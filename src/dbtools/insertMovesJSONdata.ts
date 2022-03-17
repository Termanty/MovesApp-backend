'use strict';

// INSTRUCTIONS:
// This is a tool to import the moves from db.json to our mySql database
// Before using this:
// 1. Create the database with the createDanceMoveDB.sql-file
// 2. Make sure .env-file is in dist/dbtools-folder
// 3. Add the db.json-file to the dist/dbtools-folder (file not available in GitHub) and change the file to an array format:
// [
// 	{
// 		"Move": "xxx",
// 		"Creator": "xxx",
// 		"Id": 1
// 	},
// ]

const MariaDb = require('../mariaDB');
const jsondb = require('./db.json');
require('dotenv').config();

type DbOptions = {
	host: string;
	port: string;
	user: string;
	password: string;
	database: string;
};
const dbOptions: DbOptions = {
	host: process.env.DB_HOST || '',
	port: process.env.DB_PORT || '',
	user: process.env.DB_USER || '',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_DATABASE || '',
};

const database = new MariaDb(dbOptions);

async function add(moves: any[]) {
	for (let move of moves) {
		try {
			const parameters: [
				number,
				string,
				string | boolean,
				string | boolean,
				string | boolean
			] = [
				move.Id,
				move.Move,
				move.Creator === '?' ? null : move.Creator || null,
				move.HOX || null,
				move.Link || null,
			];

			const sql =
				'insert into moves (id,movename,creator,hox,link) values(?,?,?,?,?)';

			const status = await database.doQuery(sql, parameters);
			console.log('Status', status);
		} catch (err) {
			console.log(err);
		}
	}
}
add(jsondb);
