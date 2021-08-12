import React, { useState } from 'react';
import { Menu } from '../../components/Menu';
import { Redirect } from 'react-router-dom';

export const Cadastrar = () => {

    const [produto, setProduto] = useState({
        nome: '',
        valor: '',
        quantidade: ''    
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setProduto({ ...produto, [e.target.name]: e.target.value});

    const addProduto = async e => {
        e.preventDefault();
        console.log("Quantidade: " + produto.quantidade);
        setStatus({
            type: 'error',
            mensagem: 'Erro: Não foi possível cadastrar o produto!'
        }); 
        /*setStatus({
            type: 'success',
            mensagem: 'Produto cadastrado com sucesso!'
        });*/
        /*setStatus({
            type: 'redSuccess',
            mensagem: 'Produto cadastrado com sucesso!'
        });*/
    }

    return(
        <>

        <Menu />
        <h1>Cadastrar</h1>

        {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}        
        {status.type === 'success' ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
        {status.type === 'redSuccess' ? <Redirect to={{pathname: "/listar", state: {
            type: "success",
            mensagem: status.mensagem
        }}} /> : ""}

        <form onSubmit={addProduto}> 
            <label>Nome: </label>
            <input type="text" name="nome" placeholder="Nome do produto" onChange={valueInput} /> <br/><br/>
            
            <label>Preço: </label>
            <input type="text" valor="valor" placeholder="Preço do produto" onChange={valueInput} /> <br/><br/>           

            <label>Quantidade: </label>
            <input type="number" name="quantidade" placeholder="Quantidade do produto" onChange={valueInput} /> <br/><br/>

            <button type="submit">Cadastrar</button>

        </form>

        </>
    );
}