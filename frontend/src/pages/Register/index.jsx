import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

import './styles.css';

function Register() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            return alert('As senhas não batem! Tente novamente.');
        }

        try {
            await api.post('register', { name, email, password });

            history.push('/');

        } catch(err) {
            alert('Falha no registro, tente novamente.');
        }
    }

    return (
        <div className="screen">
            <Header />
            <div className="gradient"></div>

            <div className="register-container">
                <section className="form-register">

                    <form className="form-login" onSubmit={handleRegister}>

                        <h5>Nome</h5>
                        <input
                            placeholder="nome" type="name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />

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

                        <h5>Confirme a senha</h5>
                        <input
                            placeholder="confirme a senha" type="password"
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                        />

                        <button className="button" type="submit">Registrar</button>
                    </form>

                </section>

                <Link className="back-link" to="/">Já sou cadastrado</Link>
            </div>

            <Footer />
        </div>
    )
}

export default Register;