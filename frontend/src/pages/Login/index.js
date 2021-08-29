import React, { useState, useContext } from 'react';import { useHistory } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';
import "./styles.css";
import { MainContainer, DrivePainel, FormDrive, InputDrive, ButtonDrive, LoginWith, HorizontalRule, IconsContainer, ForgotPassword, Icon } from '../../pages/Login/styles';
import { FaFacebookF, FaSteam, FaDiscord }  from 'react-icons/fa';

import api from '../../config/configApi';

export const Login = () => {

    const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const DiscordBackground =
    "linear-gradient(to right, #0546A0 0%, #8292ea 40%, #0546A0 100%)";
  const SteamBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";

    const history = useHistory();

    const {signIn} = useContext(Context);
    

    const [dadosUsuario, setUsuario] = useState({
        usuario: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        type: '',
        messagem: ''
    });

    const valorInput = e => setUsuario({ ...dadosUsuario, [e.target.name]: e.target.value });

    const loginSubmit = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        api.post("/login", dadosUsuario, { headers })
            .then((response) => {
                if (response.data.erro) {
                    setStatus({
                        type: 'erro',
                        messagem: response.data.messagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        messagem: response.data.messagem
                    });
                    // Salvar o token localStorage
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                    signIn(true);
                    return history.push('/dashboard');
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    messagem: "Erro: Usuário ou senha a senha incorreta!"
                });
            });
    }

    return (        
        <MainContainer>
             <DrivePainel>Painel do Motorista</DrivePainel>                       
            {status.type === 'erro' ? <p>{status.messagem}</p> : ""}
            {status.type === 'success' ? <p>{status.messagem}</p> : ""}
            
            <FormDrive onSubmit={loginSubmit}>
                 
                <label>Usuário: </label>
                <InputDrive type="text" name="usuario" placeholder="Digite o usuário" onChange={valorInput} />

                <label>Senha: </label>
                <InputDrive type="password" name="senha" placeholder="Digite a senha" autoComplete="on" onChange={valorInput} /> 

                <ButtonDrive type="submit">Acessar</ButtonDrive>                

            </FormDrive>
            <LoginWith> Ou acesse via</LoginWith>
                <HorizontalRule />
            <IconsContainer>
                <Icon color={FacebookBackground}>
                    <FaFacebookF />                    
                </Icon>
                <Icon color={DiscordBackground}>
                    <FaDiscord />
                </Icon>
                <Icon color={SteamBackground}>
                    <FaSteam />
                </Icon>

            </IconsContainer>
            <ForgotPassword>Esqueci a senha</ForgotPassword>    
        </MainContainer>
    );
}