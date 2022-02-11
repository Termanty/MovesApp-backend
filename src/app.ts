const Database = require("./mariaDB");

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
  port: number;
  user: string;
  password: string;
  database: string;
} = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "computerdb",
};

let db = new Database(options);

app.get("/api/computers", (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.doQuery("select * from computer");
      resolve(result.queryResult);
    } catch (err) {
      console.log(err);
      reject("Not working!");
    }
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.all("*", (req: any, res: any) => {
  res.end("hello");
});

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
