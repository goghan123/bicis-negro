import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import { SocialNetworks } from './SocialNetworks.js';

export const PageNotFound = () => {
    return (
        <div className='background'>
            <div className='App-header margins'>
                <h1>Error 404. No pudimos encontrar la página solicitada.</h1>
            </div>
            <SocialNetworks />
        </div>
    )
}
