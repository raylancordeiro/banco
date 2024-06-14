import express from "express"
const app = express()
const port = 3000
app.use(express.json())

app.get('/conta/:id', (req, res) => {
    res.json({
        conta_id: 1234,
        saldo: 18970
    })
})

app.post('/conta', (req, res) => {

    const { conta_id, saldo } = req.body
    if (!conta_id || !saldo) {
        res.status(400).json({message: "Os campos conta e saldo obrigatóriods"})
    }

    res.status(201).json({
        conta_id: 1234,
        saldo: 18970
    })
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