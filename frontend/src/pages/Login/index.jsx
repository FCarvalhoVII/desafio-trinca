import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

import './styles.css';

function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('login', { email, password });

            sessionStorage.setItem('token', response.data.token);

            history.push('/barbecues');

        } catch(err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="screen">
            <Header />
            <div className="gradient"></div>

            <div className="login-container">
                <section className="form">

                    <form className="form-login" onSubmit={handleLogin}>

                        <h5>Email</h5>
                        <input
                            placeholder="e-mail" type="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)} 
                        />

                        <h5>Senha</h5>
                        <input
                            placeholder="senha" type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />

                        <button className="button" type="submit">Entrar</button>
                    </form>

                </section>

                <Link className="back-link" to="/register">Não tenho cadastro</Link>
            </div>

            <Footer />
        </div>
    )
}

export default Login;