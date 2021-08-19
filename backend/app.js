const express = require('express');

const app = express();

app.use(express.json());

const Produto = require('./models/Produto');

app.get("/", async (req, res) => {
    res.send('Hallo Welt. Nach');
});

app.get("/list-produto", async (req, res) => {
    await Produto.findAll({
        attributes: ['id', 'nome', 'preco_venda', 'quantidade'],
        order: [['id', 'DESC']]
    })
        .then((produtos) => {
            return res.json({
                erro: false,
                produtos
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: " Nenhum produto encontrado!"
            });
        });
});

app.get("/view-produto/:id", async (req, res) => {
    const { id } = req.params;
    await Produto.findByPk(id)
        .then((produto) => {
            return res.json({
                erro: false,
                produto
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: " Nenhum produto encontrado!"
            });
        });
});

app.post("/cad-produto", async (req, res) => {
    await Produto.create(req.body)
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Produto cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: " Não foi possível cadastrar o produto!"
            });
        });
    res.send('Cadastrar produto');
});

app.put('/edit-produto', async (req, res) => {
    const {id} = req.params;
    await Produto.update(req.body, {where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Produto editado com sucesso"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: " Não foi possível editar o produto!"
        });        
    });
}); 
  
app.delete('/delete-produto/:id', async (req, res) => {  
    const {id} = req.params;
    await Produto.destroy({where: {id}})
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Produto destruído com sucesso"
        });
    }).catch(() =>{
        return res.status(400).json({
            erro: true,
            mensagem: " Não foi possível apagar o produto!"
        });        
    });
});

app.listen(8081, () => {
    console.log("Server Started at port 8081: http://localhost:8081");
});
