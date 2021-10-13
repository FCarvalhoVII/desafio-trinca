import React from 'react';
import { Link } from 'react-router-dom';
import barbecueIcon from '../../assets/Barbecue.png';

import './styles.css';

function AddBarbecue() {
    return (
        <Link to="/addBarbecue" className="add-container">

            <div className="barbecue-img">
                <img src={barbecueIcon} alt="barbecue" />
            </div>

            <span>Adicionar Churras</span>

        </Link>
    )
}

export default AddBarbecue;