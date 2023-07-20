import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import { Link as ReactLink } from 'react-router-dom';

export const Ejecutar = () => {
    return (
        <div className='App-header'>
            <h1>Y acá iría el coso para comprar.</h1>
            <div className="right-oriented">
                <ReactLink to={process.env.REACT_APP_FOR_PATH + '/carrito'} className='btn btn-secondary'>
                    Volver al carrito
                </ReactLink>
            </div>
        </div>
    )
}