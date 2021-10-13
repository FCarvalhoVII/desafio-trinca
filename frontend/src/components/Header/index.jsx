import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

function Header() {
    const token = sessionStorage.getItem('token');
    const history = useHistory();

    function handleLogout() {
        sessionStorage.clear();
        history.push('/');
    }

    return (
        <header>
            <h1>Agenda de Churras</h1>

            <div 
                className="logout"
                style={token ? { display: 'flex' } : { display: 'none' }}
            >
                <button className="button-delete" onClick={handleLogout}>
                    Sair
                </button>
            </div>
        </header>
    )
}

export default Header;