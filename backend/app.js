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
    await Usuario.findByPk(req.params.id).
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

app.get('/usuarios', eAdmin, async function (req, res) {
    await Usuario.findAll({ order: [['id', 'DESC']] }).then(function (usuarios) {
        return res.json({
            erro: false,
            usuarios
        });
    }).catch(function () {
        return res.json({
            erro: true,
            messagem: "Erro: Nenhum usuário encontrado!"
        });
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

app.put('/usuario/:id', eAdmin, async (req, res) => {
    var dados = req.body;
    dados.senha = await bcrypt.hash(dados.senha,8);
    
    await Usuario.update(dados, { where: {id: dados.id}}).
    then(function(){
        return res.json({
            erro: false,
            messagem: "Usuário alterado com sucesso!"
        });
    }).catch(function(){
        return res.json({
            erro: true,
            messagem: "Erro: Não foi possível alterar o usuário!"
        });
    });
});

app.delete('/usuario/:id', eAdmin, async (req, res) => {
    await Usuario.destroy({where: {id: req.params.id}}).
    then(function(){
        return res.json({
            erro: false,
            messagem: "Usuário apagado com sucesso!"
        });
    }).catch(function(){
        return res.json({
            erro: true,
            messagem: "Erro: Não foi possível apagar usuário!"
        });
    });
});

app.post('/login', async (req, res) => {
    const usuario = await Usuario.findOne({ where: { email: req.body.usuario } });
    if (usuario === null) {
        return res.json({
            erro: true,
            messagem: "Erro: Usuário ou a senha incorreta!"
        });
    }

    if (!(await bcrypt.compare(req.body.senha, usuario.senha))) {
        return res.json({
            erro: true,
            messagem: "Erro: Usuário ou a senha incorreta!"
        });
    }
    var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        //expiresIn: 600 //10min
        expiresIn: '7d' //7 dias
    })

    return res.json({
        erro: false,
        messagem: "Login realizado com sucesso!",
        token
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
