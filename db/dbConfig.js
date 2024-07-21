const pgp = require("pg-promise")();
require("dotenv").config();

const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;
const cn = DATABASE_URL
  ? { connectionString: DATABASE_URL, max: 30 }
  : {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
    };

const db = pgp(cn);

db.connect()
  .then((cn) => {
    const { user, host, port, database } = cn.client;
    console.log(
      `Postgres connection established with user: ${user}, host: ${host}, port: ${port}, database: ${database}`
    );
    cn.done();
  })
  .catch((error) => console.log("database connection error", error));

module.exports = db;
