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
      reject("Not working!" + err);
    }
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/:id", (req: any, res: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.doQuery("select ? from moves");
      resolve(result.queryResult);
    } catch (err) {
      console.log(err);
      reject("Not working!");
    }
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// app.PATCH/POST("/addOrUpdate", (req: any, res: any) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await db.doQuery("CORRECTLY FORMED SQL STATEMENTS WITH THE MODIFIED DATA");
//       resolve(result.queryResult);
//     } catch (err) {
//       console.log(err);
//       reject("Not working!");
//     }
//   })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// }); */

app.all("*", (req: any, res: any) => {
  res.end("Hello welcome to Movesit database");
});

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
