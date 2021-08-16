const Sequelize = require('sequelize');
const db = require ('./db');

const Produto = db.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alloNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        alloNull: false
    },
    preco_compra: {
        type: Sequelize.DOUBLE,
    },
    preco_venda: {
        type: Sequelize.DOUBLE,
    },
    quantidade: {
        type: Sequelize.INTEGER
    }
});

//Criar tabela
Produto.sync();

module.exports = Produto;
