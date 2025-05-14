import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'tua_password',
    database: 'chessmate',
  },
});

export default db;

