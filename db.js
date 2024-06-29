import mysql from 'mysql';

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port     : process.env.DB_PORT
  });

connection.connect((err) => {
    if (err) throw err;
    console.log('Banco de dados conectado')
});

export default connection;
