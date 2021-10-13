import React from 'react';
import logoFooter from '../../assets/Footer.png';

import './styles.css';

function Footer() {
    return (
        <footer>
            <div className="logo-container">
                <img src={logoFooter} alt="Trinca" />
            </div>
        </footer>
    )
}

export default Footer;