const express = require('express');
const {bankService, users} = require('./bankService');
const app = express();

app.use(express.json());

app.post('/transfer', (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        
        if (senderId == null || receiverId == null || amount == null) {
            return res.status(400).json({ error: "Dados incompletos" });
        }

        const result = bankService.transfer(senderId, receiverId, amount);
        res.status(200).json(result);

    } catch (error) {
       
    if (error.message === "Usuário não encontrado") {
        return res.status(404).json({ error: error.message });
    }

    if (error.message === "Saldo insuficiente") {
        return res.status(400).json({ error: error.message });
    }

    if (error.message === "Valor inválido") {
        return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Erro interno no servidor" });
    }
});

module.exports = app;