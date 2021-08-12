import React, { useState, useEffect } from 'react';
import { Menu } from '../../components/Menu';

export const Editar = (props) => {

    const [id] = useState(props.match.params.id);        
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const editProduto = async e => {
        e.preventDefault();
        console.log("Quantidade: " + quantidade);
    }


    useEffect(() => {

        const getProduto = async() => {
            setNome("Mouse");
            setValor(35.50);
            setQuantidade(45); 
              
            }            
       
        getProduto();

    }, [id]);


    return(
        <>

        <Menu />
        <h1>Editar</h1>

        <form onSubmit={editProduto}> 
            <label>Nome: </label>
            <input type="text" name="nome" placeholder="Nome do produto" value={nome}onChange={e => setNome(e.target.value)} /> <br/><br/>
            
            <label>Preço: </label>
            <input type="text" valor="valor" placeholder="Preço do produto" value={valor} onChange={e => setValor(e.target.value)} /> <br/><br/>           

            <label>Quantidade: </label>
            <input type="number" name="quantidade" placeholder="Quantidade do produto" value={quantidade} onChange={e => setQuantidade(e.target.value)}  /> <br/><br/>

            <button type="submit">Salvar</button>

        </form>

        </>
    );
}