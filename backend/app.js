const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models/db');

app.get("/", async (req, res) => {
    res.send('Hallo Welt. Nach');
});

app.post("/cad-produto", async (req, res) => {
    console.log(req.body);
    res.send('Cadastrar produto');
});

app.listen(8081, () => {
    console.log("Server Started at port 8081: http://localhost:8081");
});
