const mariadb = require("mariadb");

module.exports = class Database {
  options: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    allowPublicKeyRetrieval: boolean;
  };

  constructor(options: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    allowPublicKeyRetrieval: boolean;
  }) {
    this.options = options;
    this.options.allowPublicKeyRetrieval = true;
  }

  doQuery(sql: [], parameters: string = "") {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await mariadb.createConnection(this.options);
        console.log(connection);
        let queryResult = await connection.query(sql, parameters);
        if (typeof queryResult === "undefined") {
          reject("Query Error");
        } else if (typeof queryResult.affectedRows === "undefined") {
          delete queryResult.meta;
          resolve({ queryResult, resultSet: true });
        } else {
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
        reject("SQL-error" + err);
      } finally {
        if (connection) connection.end();
      }
    });
  }
};
