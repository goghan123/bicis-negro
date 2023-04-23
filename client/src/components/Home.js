import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import centralLogo from '../elements/images/N-netflix.png';
import { useResponsiveTools } from '../elements/someFunctions.js';
import { SocialNetworks } from './SocialNetworks.js';

const LocalComponent = () => {
    const { windowHeight } = useResponsiveTools();
    return (
        <div className='App-header'>
            <div className='margins'>
                <br></br>
                {
                    windowHeight < 530 &&
                    <div>
                        <br></br>
                        <br></br>
                    </div>
                }
                <div className='centered' key='home'>
                    <img src={centralLogo} className="medium-image" alt="logo" />
                </div>
            </div >
            <SocialNetworks />
        </div>
    )
}

export const Home = () => {
    return (
        <div className='background'>
            <LocalComponent />
        </div>
    )
}
