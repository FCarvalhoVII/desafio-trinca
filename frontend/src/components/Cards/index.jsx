import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import peoppleImg from '../../assets/Peopple.png';
import moneyImg from '../../assets/Money.png';
import api from '../../services/api';

import './styles.css';

function Cards({ description, date, id }) {
    const [ contributors, setContributors ] = useState([]);
    const [ totalValue, setTotalValue ] = useState('');

    useEffect(() => {
        if (id) {
            api.get(`contributor/${id}`)
                .then(resp => {
                    setContributors(resp.data.contributorsList);
                    setTotalValue(resp.data.amount);
                });
        }
    }, [id]);

    return (
        <Link to={`/contributors/${id}`} className="card">
            <div className="info-container">
                <h5 className="date">{ moment(date).format('DD/MM') }</h5>

                <h6 className="barbecue-name">{ description }</h6>
            </div>

            <div className="row-container">
                <div className="img-info">
                    <img src={peoppleImg} alt="" />

                    <p>{ contributors.length }</p>
                </div>

                <div className="img-info">
                    <img src={moneyImg} alt="" />

                    <p>
                        {
                            Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                .format(totalValue)
                        }
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default Cards;