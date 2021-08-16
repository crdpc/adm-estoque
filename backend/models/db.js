const Sequelize = require('sequelize');

const sequelize = new Sequelize('estoque', 'fbtc', '87645crd', {
    host: '192.168.1.25',
    dialect: 'mysql' 
  });

  sequelize.authenticate()
    .then(function(){
        console.log("Conexão realizada!")


    }).catch(function(){
        console.log("Não foi possível conectar ao banco de dados");
    })

  module.exports = sequelize;
