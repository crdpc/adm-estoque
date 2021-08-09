import React, { useState } from 'react';
import { Menu } from '../../components/Menu';

export const Cadastrar = () => {

    const [produto, setProduto] = useState({
        nome: '',
        valor: '',
        quantidade: ''    
    });

    const valueInput = e => setProduto({ ...produto, [e.target.name]: e.target.value});

    const addProduto = async e => {
        e.preventDefault();
        console.log("Valor: " + produto.valor);
    }

    return(
        <>

        <Menu />
        <h1>Cadastrar</h1>

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