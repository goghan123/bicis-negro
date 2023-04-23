import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logoWpp from '../elements/images/logo-wpp.svg';
import logoIg from '../elements/images/logo-ig.svg';
import '../styles.css';
import { useResponsiveTools } from '../elements/someFunctions.js';

const CellNumber = () => {
    return (
        <div className='data'>
            <p className='social-networks-text horizontal-alligned'>+99 999 9999 9999</p>
        </div>
    )
}
const Instagram = () => {
    return (
        <div className='data'>
            <p className='social-networks-text horizontal-alligned'>@marca.negro</p>
        </div >
    )
}
export const SocialNetworks = () => {
    const { windowWidth, hideItems, itemsAreVisible } = useResponsiveTools();
    return (
        <div className={windowWidth >= 768 ?
            'grid-container fixed-now bigger-margin' : windowWidth < 768 && windowWidth > 650 ?
                'grid-container fixed-now mid-margin' : windowWidth <= 650 && windowWidth > 500 ?
                'grid-container fixed-now tiny-margin': 'grid-container fixed-now tiniest-margin'}>
            <div className='grid-element'>
                {itemsAreVisible && <CellNumber />}
            </div>
            <div className='grid-element handy'>
                <img src={logoWpp} alt='logo-wpp' onClick={hideItems} className='mini-logo-social'></img>
            </div>
            <div className='grid-element'>
                {itemsAreVisible && <Instagram />}
            </div>
            <div className='grid-element handy'>
                <img src={logoIg} alt='logo-ig' onClick={hideItems} className='mini-logo-social'></img>
            </div>
        </div>
    )
}
