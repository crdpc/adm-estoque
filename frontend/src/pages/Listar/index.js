import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '../../components/Menu';

export const Listar = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: state? state.type : "",
        mensagem: state? state.mensagem : ""
    });

    const listarProdutos = async  => {
        var valores = [
            {
                "id": 3,
                "mnome":  "Pen Drive",
                "valor": 150.50,
                "quantidade": 20,               
            },
            {
                "id": 2,
                "mnome":  "Teclado",
                "valor": 120.50,
                "quantidade": 35,               
            },
            {                
                "id": 1,
                "mnome":  "Mouse",
                "valor": 35.50,
                "quantidade": 45  
            }
        ]

        setData(valores);
    }

    useEffect(() => {
        listarProdutos();
    }, []);

    const apagarProduto = async (idProduto) => {
        console.log(idProduto);
    }

    return(
        <>
        <Menu />
        <h1>Listar</h1>

        {status.type === "success" ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}

        <Link to="/cadastrar"><button type="button">Cadastrar</button></Link>

        <hr />

        <table>
            <thead>
                <tr>
                   <td>ID</td>
                   <td>Nome</td>
                   <td>Valor</td>
                   <td>Quantidade</td>
                   <td>Ações</td>
                </tr>
                <tbody>
                    {data.map(produto =>(
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.mnome}</td>
                            <td>{produto.valor}</td>
                            <td>{produto.quantidade}</td>
                            <td>
                                <Link to={"/visualizar/" + produto.id}><button type="button">Visualizar</button></Link>{" "}
                              
                                <Link to={"/editar/" + produto.id}><button type="button">Editar</button></Link>{" "}
                              <Link to ={"#"}><button onClick={() => apagarProduto(produto.id)}>Apagar</button></Link>
                                </td>
                                
                        </tr>
                    ))}            
                </tbody>
            </thead>
        </table>
        </>
    );
}