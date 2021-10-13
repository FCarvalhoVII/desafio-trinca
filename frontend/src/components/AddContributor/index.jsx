import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

function AddContributor({ activeModal, handleModal, barbecueId, suggestValue }) {
    const [ name, setName ] = useState('');
    const [ value, setValue ] = useState('');
    const [ withDrink, setWithDrink ] = useState(true);
    const [ paid, setPaid ] = useState(false);

    async function handleAddContributor() {
        const token = sessionStorage.getItem('token');

        const body = {
            name,
            value: Number(value),
            withDrink,
            paid
        }

        try {
            await api.post(`contributor/${barbecueId}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            window.location.reload();

        } catch(err) {
            alert('Erro ao adicionar, tente novamente.');
        }
    }

    return (
        <div 
            className="modal-contributor"
            style={activeModal ? { display: 'flex' } : { display: 'none' }}
        >
            <div className="modal-container">
                <form className="form-login" onSubmit={handleAddContributor}>

                    <h5>Nome</h5>
                    <input
                        placeholder="nome" type="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <h5>Valor (Sugerido: R$ {suggestValue})</h5>
                    <input
                        placeholder="valor" type="number"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />

                    <div className="radios-container">

                        <div className="radio-container">
                            <h5>Com Bebida?</h5>

                            <div className="radio-space">
                                <input
                                    type="radio" name="withDrink" id="true"
                                    defaultChecked={withDrink}
                                    value={withDrink}
                                    onClick={() => setWithDrink(true)}
                                />
                                <label>Sim</label>

                                <input type="radio" name="withDrink" id="false"
                                    value={withDrink}
                                    onClick={() => setWithDrink(false)}
                                />
                                <label>Não</label>
                            </div>
                        </div>

                        <div className="radio-container">
                            <h5>Já pagou?</h5>

                            <div className="radio-space">
                                <input
                                    type="radio" name="paid" id="true"
                                    value={paid}
                                    onClick={() => setPaid(true)}
                                />
                                <label>Sim</label>

                                <input 
                                    type="radio" name="paid" id="false"
                                    defaultChecked={!paid}
                                    value={paid}
                                    onClick={() => setPaid(false)}
                                />
                                <label>Não</label>                
                            </div>
                        </div>
                    </div>

                    <div className="buttons">
                        <span className="button-delete" onClick={() => handleModal()}>Cancelar</span>
                        <button className="button-add" type="submit">Adicionar</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AddContributor;