import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';

export const Visualizar = (props) => {
    
    const [id] = useState(props.match.params.id);    
    const [ data, setData] = useState("");

    useEffect(() => {

        const getProduto = async() => {
            setData({
                id: 1,
                nome: "Mouse",
                valor: 35.50,
                quantidade: 45 
            })

            
        }
        getProduto();

    }, [id]);

    return(
        <>

        <Menu />
        <h1>Visualizar</h1>
        <span>ID: {data.id}</span> <br />
        <span>Nome: {data.nome}</span> <br />
        <span>Valor: {data.valor}</span> <br />
        <span>Quantidade: {data.quantidade}</span> <br />
        </>
    );
}