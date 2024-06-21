import "dotenv/config"
import express from "express"
import mysql from 'mysql'
const app = express()
const port = 3000
app.use(express.json())

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  database : process.env.DB_NAME,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD
});

app.get('/conta/:id', (req, res) => {

    connection.query(
        `SELECT * FROM conta WHERE conta_id = ${req.params.id}`,
        function(err, rows, fields
        ) {
        if (err) throw err;
        if(rows.length == 0) {
            res.status(404).json({})
        }
        res.json(rows[0])
      });
})

app.post('/conta', (req, res) => {

    const { conta_id, saldo } = req.body
    if (!conta_id || !saldo) {
        res.status(400).json({message: "Os campos conta e saldo obrigatóriods"})
    }

})

app.post('/transacao', (req, res) => {

    const { forma_pagamento, conta_id, valor } = req.body
    if (!forma_pagamento || !conta_id || !valor) {
        res.status(400).json({message: "Os campos obrigatóriods não foram enviados"})
    }

    res.status(201).json({
        conta_id: 1234,
        saldo: 18970
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})