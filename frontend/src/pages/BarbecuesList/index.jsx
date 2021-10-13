import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cards from '../../components/Cards';
import AddBarbecue from '../../components/AddBarbecue';
import api from '../../services/api';

import './styles.css';

function BarbecuesList() {
    const [ barbecues, setBarbecues ] = useState([]);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        api.get('barbecue', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => setBarbecues(resp.data.barbecues))
            .catch(() => alert('Falha ao tentar obter resposta do servidor, tente mais tarde'));
    }, [token]);

    return (
        <div className="screen">
            <Header />

            <div className="main-container">
                <div className="cards-container">
                    {barbecues.map(barbecue => (
                        <Cards 
                            key={barbecue._id}
                            description={barbecue.description}
                            date={barbecue.date}
                            id={barbecue._id}
                        />
                    ))}
                    <AddBarbecue />
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default BarbecuesList;