import React, { useState, useContext } from 'react';import { useHistory } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

import api from '../../config/configApi';

export const Login = () => {

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
        <div>
            <h1 className="text-primary">Login</h1>

            {status.type === 'erro' ? <p>{status.messagem}</p> : ""}
            {status.type === 'success' ? <p>{status.messagem}</p> : ""}

            <form onSubmit={loginSubmit}>
                <label>Usuário: </label>
                <input type="text" name="usuario" placeholder="Digite o usuário" onChange={valorInput} /><br /><br />

                <label>Senha: </label>
                <input type="password" name="senha" placeholder="Digite a senha" autoComplete="on" onChange={valorInput} /><br /><br />

                <button type="submit">Acessar</button>

            </form>
        </div>
    );
}