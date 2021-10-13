import React, { useState } from 'react';
import checkIcon from '../../assets/Check.png'
import unCheckIcon from '../../assets/Uncheck.png';
import api from '../../services/api';

import './styles.css';

function Contributor({ name, value, id, paid, token }) {
    const [ activeModal, setActiveModal ] = useState(false);
    const [ isPaid, setIsPaid ] = useState(paid);

    async function handleUpdateContributor() {
        try {
            await api.put(`contributor/${id}`, { paid: isPaid }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setActiveModal(false);
            window.location.reload();

        } catch(err) {
            alert('Erro ao confirmar as alterações, tente mais tarde.');
        }
    }

    async function handleDeleteContributor() {
        try {
            await api.delete(`contributor/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setActiveModal(false);
            window.location.reload();

        } catch(err) {
            alert(`Erro ao excluir ${name} do churras, tente mais tarde.`);
        }
    }

    return (
        <>
            <div className="contributor-row" onClick={() => setActiveModal(true)}>
                <div className="paid-name">
                    <img src={paid ? checkIcon : unCheckIcon} alt="" />
                    <p>{ name }</p>
                </div>
                <span className={!paid ? '' : 'text-paid'}>
                    {
                        Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                            .format(value)
                    }
                </span>
            </div>
            
            <div 
                className="modal-contributor"
                style={activeModal ? { display: 'flex' } : { display: 'none' }}
            >
                <div className="modal-container">

                    <div className="del-container">                      
                        <h5 className="title-contributor">Deseja excluir {name} do churras?</h5>

                        <span className="button-del" onClick={() => handleDeleteContributor()}>
                            Sim
                        </span>
                    </div>

                    <form className="form-edit" onSubmit={handleUpdateContributor}>
                        <div className="radio-container">
                            <h5 className="title-contributor">{name} já pagou o churras?</h5>

                            <div className="radio-space">

                                <input
                                    type="radio" name="paid" id="true"
                                    defaultChecked={isPaid}
                                    value={isPaid}
                                    onClick={() => setIsPaid(true)}
                                />
                                <label>Sim</label>

                                <input 
                                    type="radio" name="paid" id="false"
                                    defaultChecked={!isPaid}
                                    value={isPaid}
                                    onClick={() => setIsPaid(false)}
                                />
                                <label>Não</label>        

                            </div>                            
                        </div>

                        <div className="buttons">
                            <span className="button-delete" onClick={() => setActiveModal(false)}>
                                Cancelar
                            </span>
                            
                            <button className="button-add" type="submit">Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contributor;