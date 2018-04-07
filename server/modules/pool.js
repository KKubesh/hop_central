// PG CONFIG SETUP
// const pg = require('pg');
// const Pool = pg.Pool;
// const config = {
//   database: 'hopcentral', //name of database
//   host: 'localhost',
//   port: 5432, //default for postgres
//   max: 10, //Max connections to DB
//   idleTimeoutMillis: 30000
// }

// const pool = new Pool(config);

// pool.on('connect', (client) => {
//   console.log('posgresql connected!');
// });

// pool.on('error', (err, client) => {
//   console.log('Unexpected Error on Postgresql', err);
//   process.exit(-1);
// });

// module.exports = pool;

const pg = require('pg');
const url = require('url');
let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  let params = url.parse(process.env.DATABASE_URL);
  let auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };

} else {
  // only change the things on the right side of the ||
  config = {
    user: process.env.PG_USER || null, //env var: PGUSER
    password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
    host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
    port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
    database: process.env.DATABASE_NAME || 'hopcentral', //env var: PGDATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

module.exports = new pg.Pool(config);