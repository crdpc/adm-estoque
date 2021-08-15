import React, { useState } from 'react';
import { Menu } from '../../components/Menu';
import { Redirect, Link } from 'react-router-dom';
import { Container, ConteudoTitulo, Titulo, BotaoAcao, ButtonSuccess, ButtonInfo, Form, Label, Input, Hr, AlertDanger, AlertSuccess } from '../../styles/custom_adm';

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
        <Container>

        <Menu />
        <ConteudoTitulo>
                <Titulo>Cadastrar</Titulo>
                <BotaoAcao>
                    <Link to="/listar">
                        <ButtonInfo type="button">Listar</ButtonInfo>
                    </Link>{" "}                   
                </BotaoAcao>
            </ConteudoTitulo>        

        {status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}        
        {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
        {status.type === 'redSuccess' ? <Redirect to={{pathname: "/listar", state: {
            type: "success",
            mensagem: status.mensagem
        }}} /> : ""}

        <Hr />

        <Form onSubmit={addProduto}> 
            <Label>Nome: </Label>
            <Input type="text" name="nome" placeholder="Nome do produto" onChange={valueInput} /> 
            
            <Label>Preço: </Label>
            <Input type="text" valor="valor" placeholder="Preço do produto" onChange={valueInput} />  

            <Label>Quantidade: </Label>
            <Input type="number" name="quantidade" placeholder="Quantidade do produto" onChange={valueInput} /> 

            <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>

        </Form>

        </Container>
    );
}