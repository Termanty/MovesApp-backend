import { resolve } from "path";
import { resourceUsage } from "process";

const Database = require("./mariaDB");
require("dotenv").config();

const http = require("http");
const path = require("path");
const cors = require("cors");

const express = require("express");

const app = express();

const port: number = 4000;
const host: string = "localhost";

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

let options: {
	host: string;
	port: string;
	user: string;
	password: string;
	database: string;
} = {
	host: process.env.DB_HOST || "",
	port: process.env.DB_PORT || "",
	user: process.env.DB_USER || "",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_DATABASE || "",
};

let db = new Database(options);

app.get("/allMoves", (req: any, res: any) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await db.doQuery("select * from moves");
			resolve(result.queryResult);
		} catch (err) {
			console.log(err);
			reject("Not working!");
		}
	})
		.then((result) => res.json(result))
		.catch((err) => res.json(err));
});

app.get("/oneMove/:id", (req: any, res: any) => {
	const id: number = req.params.id;
	return new Promise(async (resolve, reject) => {
		try {
			const result = await db.doQuery("select * from moves where id = ?", id);
			resolve(result.queryResult);
		} catch (err) {
			console.log(err);
			reject("Not working!");
		}
	})
		.then((result) => res.json(result))
		.catch((err) => res.json(err));
});

app.post("/updateMove/", (req: any, res: any) => {
	const move = req.body;

	const parameters = [
		move.movename,
		move.creator || '',
		move.hox || '',
		move.link || '',
		+move.id
	]

	return new Promise(async (resolve, reject) => {
		try {
			const result = await db.doQuery('update moves set movename=?, creator=?, hox=?, link=?' + 'where id=?', parameters);
			resolve('update status : rowsChanged =' + result.queryResult.rowsChanged);
		}
		catch (err) {
			reject('Could not update' + err);
		}
	})
		.then((result) => res.json(result));
})

app.post("/addNew", (req: any, res: any) => {

	const newMove = req.body;
	return new Promise(async (resolve, reject) => {
		try {
			const parameters = [
				+newMove.id,
				newMove.movename,
				newMove.creator || '',
				newMove.hox || '',
				newMove.link || ''
			]
			const result = await db.doQuery('insert into moves (id,movename,creator,hox,link) values (?,?,?,?,?)', parameters);
			resolve(result.queryResult);
		} catch (err) {
			console.log(err);
			reject("Not added");
		}
	}).then((result) => res.json(result))
		.catch((err) => res.json(err));
});




app.all("*", (req: any, res: any) => {
	res.end("hello");
});

server.listen(port, host, () =>
	console.log(`Server ${host}:${port} available.`)
);
