import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
// import centralLogo from '../elements/images/N-netflix.png';
// import { useResponsiveTools } from '../elements/someFunctions.js';
import { Products } from './Products.js';





export const Home = () => {
    return (
        <div className='background'>
            <Products />
        </div>
    )
}
