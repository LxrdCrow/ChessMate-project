import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'tua_password', 
    database: 'chessmate',
    port: 3306, 
  },
  pool: { min: 0, max: 7 }, 
});

export default db;

