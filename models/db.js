const { Pool } = require("pg");
const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString,
});
// check the connection
pool.connect((err, pool) => {
  if (err) {
    console.error("Pool error: ", err.message, err.stack);
    return;
  }
  console.error("Pool connected on: ", pool.user);
});

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "0000",
//   port: "5432",
//   database:"postgres"
// });
// pool
//   .connect()
//   .then(() => {
//     console.log("connected on " + pool);
//   })
//   .catch((error) => {
//     console.error("client didn't connect", error.message, error.stack);
//   });
module.exports = {
  pool,
};
