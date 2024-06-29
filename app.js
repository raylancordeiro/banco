import "dotenv/config"
import express from "express"
import connection from "./db.js"
import EmailService from "./emailService.js"

const app = express()
const port = 3000
app.use(express.json())

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

    connection.query(
        `INSERT INTO conta (conta_id, saldo) VALUES (${conta_id}, ${saldo})`,
        function(err, rows, fields
        ) {
        if (err) throw err;
        res.status(201).json(req.body)
      });
})

app.post('/transacao', async (req, res) => {

    let { forma_pagamento, conta_id, valor } = req.body

    // validações
    if (!forma_pagamento || !conta_id || !valor) {
        res.status(400).json({message: "Os campos obrigatóriods não foram enviados"})
    }
    if(!['D', 'C', 'P'].includes(forma_pagamento)) {
        res.status(400).json({message: "Forma de pagamento inválida. (D, C, P)"})
    }
    if(valor < 0) {
        res.status(400).json({message: "Valor inválido."})
    }

    //calcula imposto
    let formaPagamentoDescricao = 'Pix';
    switch (forma_pagamento) {
        case 'D':
            valor -= valor * 0.03;
            formaPagamentoDescricao = 'Debito'
        break;
        case 'C':
            valor -= valor * 0.05;
            formaPagamentoDescricao = 'Credito'
        break;
        default:
            valor = valor;
    }

    //Realiaza transacao
    connection.query(
        `UPDATE conta SET saldo = saldo - ${valor} WHERE conta_id = ${conta_id}`,
        function(err, rows, fields
        ) {
        if (err) throw err;
    });

    connection.query(
        `INSERT INTO transacao (conta_id, forma_pagamento, valor)
        VALUES (${conta_id} , '${forma_pagamento}', ${valor})`,
        function(err, rows, fields
        ) {
        if (err) throw err;
    });

    connection.query(
        `SELECT saldo FROM conta WHERE conta_id = ${conta_id}`,
        function(err, rows, fields
        ) {
        if (err) throw err;
        res.status(201).json({
            conta_id: conta_id,
            saldo: rows[0].saldo
        })
    });

    await EmailService.sendEmail(conta_id, valor, formaPagamentoDescricao);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})