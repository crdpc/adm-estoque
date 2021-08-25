const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { eAdmin } = require('./middlewares/auth');

const app = express();

app.use(express.json()); 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});


const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');

app.get('/usuario/:id', eAdmin, async (req, res) => {
    await Usuarios.findByPk(req.params.id).
    then(usuario => {
        return res.json({
            erro: false,
            usuario
        });
    }).catch(function(){
        return res.json({
            erro: true,
            messagem: "Erro: Usuário não encontrado!"
        });
    });
});

app.get('/usuarios', eAdmin, function (req, res) {
    return res.json({
        erro: false,
        messagem: "Listar usuários!"
    });
});

app.post('/usuario', async (req, res) => {
    var dados = req.body;
    dados.senha = await bcrypt.hash(dados.senha, 8);
    
    await Usuario.create(dados).then(function () {
        return res.json({
            erro: false,
            messagem: "Usuário cadastrado com sucesso!"
        });
    }).catch(function () {
        return res.json({
            erro: true,
            messagem: "Erro: Não foi possível cadastrar o usuário!"
        });
    });

});

app.post('/login', function (req, res) {
    //console.log(req.body.senha);
    if (req.body.usuario === 'crdpc@yahoo.com.br' && req.body.senha === '123456') {
        const { id } = 1;
        var privateKey = process.env.SECRET;
        var token = jwt.sign({ id }, privateKey, {
            //expiresIn: 600 //10min
            expiresIn: '7d' //7 dias
        })

        return res.json({
            erro: false,
            messagem: "Login válido!",
            token
        });
    }
    return res.json({
        erro: true,
        messagem: "Erro: Login ou senha incorreto!"
    });
});
    

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
