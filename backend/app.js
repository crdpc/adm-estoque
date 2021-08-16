const express = require('express');
const app = express();

app.use(express.json());

const Produto = require('./models/Produto');

app.get("/", async (req, res) => {
    res.send('Hallo Welt. Nach');
});

app.post("/cad-produto", async (req, res) => {
    await Produto.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Produto cadastrado com sucesso!"
        });      
    }).catch(()=> {
        return res.status(400).json( {
            erro: true,
            mensagem: " Não foi possível cadastrar o produto!"
        });  
    });
    res.send('Cadastrar produto');
});

app.listen(8081, () => {
    console.log("Server Started at port 8081: http://localhost:8081");
});
