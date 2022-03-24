import mariadb from "mariadb";
import Options from "./models/options";

export default class Database {
  private options;

  constructor(options: Options) {
    this.options = options;
    this.options.port = Number(options.port);
    this.options.allowPublicKeyRetrieval = true;
  }

  doQuery(sql: string, parameters?: any[] | string) {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await mariadb.createConnection(this.options);
        let queryResult = await connection.query(sql, parameters);
        if (typeof queryResult === "undefined") {
          reject("Query Error");
        } else if (typeof queryResult.affectedRows === "undefined") {
          delete queryResult.meta;
          // console.log(queryResult);
          resolve({ queryResult, resultSet: true });
        } else {
          console.log(queryResult);
          resolve({
            queryResult: {
              rowsChanged: queryResult.affectedRows,
              insertId: queryResult.insertId,
              status: queryResult.warningStatus,
            },
            resultSet: false,
          });
        }
      } catch (err) {
        reject("SQL-error: " + err);
      } finally {
        if (connection) connection.end();
      }
    });
  }
}
