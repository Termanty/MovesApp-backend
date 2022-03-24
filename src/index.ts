import http from "http";
import express from "express";
import cors from "cors";
import Database from "./mariaDB";
import { Application, Request, Response } from "express";
import { Settings } from "./settings";
import Printer from "./controllers/createPrinter";
import Options from "./models/options";

require("dotenv").config();

const app: Application = express();
const server = http.createServer(app);
let print = new Printer(Settings.port, Settings.host);

app.use(cors());
app.use(express.json());

let options: Options = {
  host: process.env.DB_HOST || "",
  port: +process.env.DB_PORT! || 0,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "",
  allowPublicKeyRetrieval: true,
};

let db = new Database(options);

app.get("/allMoves", (req: Request, res: Response) => {
  db.doQuery("select * from moves")
    .then((result: any) => res.json(result.queryResult))
    .catch(() => res.json("Not working!"));
});

app.get("/oneMove/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  db.doQuery("select * from moves where id = ?", id)
    .then((result: any) => res.json(result.queryResult))
    .catch(() => res.json("Not working!"));
});

app.post("/updateMove/", (req: Request, res: Response) => {
  const move = req.body;
  const parameters: [
    string,
    string | boolean,
    string | boolean,
    string | boolean,
    number
  ] = [
    move.movename,
    move.creator || "",
    move.hox || "",
    move.link || "",
    +move.id,
  ];
  db.doQuery(
    "update moves set movename=?, creator=?, hox=?, link=?" + "where id=?",
    parameters
  )
    .then((result: any) =>
      res.json("update status : rowsChanged =" + result.queryResult.rowsChanged)
    )
    .catch(() => res.json("Not working!"));
});

app.post("/addNew", (req: Request, res: Response) => {
  const newMove = req.body;
  const parameters: [
    string,
    string | boolean,
    string | boolean,
    string | boolean
  ] = [
    newMove.movename,
    newMove.creator || "",
    newMove.hox || "",
    newMove.link || "",
  ];
  db.doQuery(
    "insert into moves (movename,creator,hox,link) values (?,?,?,?)",
    parameters
  )
    .then((result: any) => {
      console.log("Saved: ", parameters);
      res.json(
        "update status : rowsChanged =" + result.queryResult.rowsChanged
      );
    })
    .catch(() => {
      console.log("Error: save to db failed -", parameters);
      res.json("Not working!");
    });
});

app.all("*", (req: Request, res: Response) => {
  res.end("hello");
});

server.listen(Settings.port, Settings.host, (): void =>
  console.log(print.messagePrint())
);
