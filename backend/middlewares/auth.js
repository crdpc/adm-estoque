const jwt = require ('jsonwebtoken');
const {promisify} = require('util');
require('dotenv').config();

module.exports = {
    eAdmin: async function (req, res, next){
            const autHeader =  req.headers.authorization;
            const [ , token] = autHeader.split(' ');
            
             if(!token){
                 return res.json( {
                     erro: true,
                     messagem: "Erro: Você ainda não fez login!"
                 })
                
             }
    
             try{
                const decode = await promisify(jwt.verify)(token, process.env.SECRET);
                req.userId = decode.id;
                return next();
             }catch(err) {
                return res.json({
                    erro: true,
                    mensagem: "Erro: Usuário ou senha inválidos!"
                });
             }         
    }
}

