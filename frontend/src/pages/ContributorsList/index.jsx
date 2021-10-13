import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Contributor from '../../components/Contributor';
import AddContributor from '../../components/AddContributor';
import peoppleImg from '../../assets/Peopple.png';
import moneyImg from '../../assets/Money.png';
import moment from 'moment';
import api from '../../services/api';

import './styles.css';

function ContributorsList() {
    const [ barbecue, setBarbecue ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ paidAmount, setPaidAmount ] = useState('');
    const [ contributors, setContributors ] = useState([]);
    const [ activeModal, setActiveModal ] = useState(false);
    const [ activeDelete, setActiveDelete ] = useState(false);
    
    const { barbecueId } = useParams();
    const history = useHistory();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        api.get(`barbecue/${barbecueId}`)
            .then(resp => setBarbecue(resp.data.barbecue))
            .catch(() => alert('Falha ao tentar obter resposta do servidor, tente mais tarde'));

        api.get(`contributor/${barbecueId}`)
            .then(resp => {
                setAmount(resp.data.amount)
                setPaidAmount(resp.data.paidAmount)
                setContributors(resp.data.contributorsList)
            })
            .catch(() => alert('Este churras não possui nenhum participante, adicione!'));
    }, [barbecueId]);

    function handleActiveModal() {
        setActiveModal(!activeModal);
    }

    async function handleDeleteBarbecue(barbecueId) {
        try {
            await api.delete(`barbecue/${barbecueId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            history.push('/barbecues');

        } catch(err) {
            alert('Erro ao deletar, tente novamente!');
        }
    }

    return (
        <div className="screen">
            <Header />

            <div className="main-container">
                <div className="barbecue-info-container">
                    <div className="top-container">
                        <div className="left-infos">
                            <span className="date">{ moment(barbecue.date).format('DD/MM') }</span>
                            <h5>{ barbecue.description }</h5>
                        </div>

                        <div className="right-infos">
                            <div className="img-info">
                                <img src={peoppleImg} alt="" />
                                <p>{ contributors.length }</p>
                            </div>

                            <div className="img-info">
                                <img src={moneyImg} alt="" />
                                <p>{ amount ? `R$ ${amount}` : 'R$ 0' }</p>
                            </div>

                        </div>
                    </div>

                    <div className="contributors-container">
                        {contributors.map(contributor => (
                            <Contributor
                                key={contributor._id}
                                name={contributor.name}
                                value={contributor.value}
                                withDrink={contributor.with_drink}
                                paid={contributor.paid}
                                id={contributor._id}
                                token={token}
                            />
                        ))}
                    </div>

                    <div className="total-container">
                        <p>Total Arrecadado:</p>
                        <span>
                            {
                                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                .format(paidAmount)
                            }
                        </span>
                    </div>

                    <div className="buttons-container">
                        <Link className="button-back" to="/barbecues">
                            Voltar
                        </Link>

                        <button className="button-delete" onClick={() => setActiveDelete(true)}>
                            Excluir Churras
                        </button>

                        <button className="button-add" onClick={() => handleActiveModal()}>
                            Adicionar Participante
                        </button>
                    </div>
                </div>

                <div 
                    className="modal-contributor"
                    style={activeDelete ? { display: 'flex' } : { display: 'none' }}
                >
                    <div className="modal-container">
                        <h5 className="title-delete">Deseja deletar este churras permanentemente?</h5>
                        <div className="buttons">
                            <button className="button-delete" onClick={() => setActiveDelete(false)}>
                                Não
                            </button>

                            <button className="button-add" onClick={() => handleDeleteBarbecue(barbecueId)}>
                                Sim
                            </button>
                        </div>
                    </div>
                </div>

                <AddContributor
                    activeModal={activeModal}
                    handleModal={handleActiveModal}
                    barbecueId={barbecueId}
                    suggestValue={barbecue.suggested_value}
                />

                <Footer />
            </div>
        </div>
    )
}

export default ContributorsList;