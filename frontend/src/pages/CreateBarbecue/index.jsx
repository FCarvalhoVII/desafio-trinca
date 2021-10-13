import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import api from '../../services/api';

import './styles.css';

function CreateBarbecue() {
    const [ description, setDescription ] = useState('');
    const [ notes, setNotes ] = useState('');
    const [ date, setDate ] = useState('');
    const [ value, setValue ] = useState('');

    const token = sessionStorage.getItem('token');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const body = {
            description,
            notes,
            date,
            value: Number(value)
        }

        try {
            await api.post('barbecue', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            history.push('/barbecues');

        } catch(err) {
            alert('Falha, tente novamente.');
        }
    }

    return (
        <div className="screen">
            <Header />
            <div className="gradient"></div>

            <div className="register-container">
                <section className="form-register">

                    <form className="form-login" onSubmit={handleRegister}>

                        <h5>Nome do Churras</h5>
                        <input
                            placeholder="nome do churras" type="string"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />

                        <h5>Notas adicionais (Opcional)</h5>
                        <input
                            placeholder="notas opcionais" type="string"
                            value={notes}
                            onChange={event => setNotes(event.target.value)}
                        />

                        <h5>Data</h5>
                        <input
                            placeholder="data" type="date"
                            value={date}
                            onChange={event => setDate(event.target.value)}
                        />

                        <h5>Valor sugerido (R$)</h5>
                        <input
                            placeholder="valor sugerido" type="number"
                            value={value}
                            onChange={event => setValue(event.target.value)}
                        />

                        <button className="button" type="submit">Adicionar</button>
                    </form>

                </section>

                <Link className="back-link" to="/barbecues">Cancelar</Link>
            </div>

            <Footer />
        </div>
    )
}

export default CreateBarbecue;