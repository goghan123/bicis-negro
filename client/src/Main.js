import 'bootstrap/dist/css/bootstrap.css';
import React, { Component, useState, useMemo } from 'react';
import {
    HashRouter as Router,
    Routes,
    Route,
    Outlet
} from "react-router-dom";
import './styles.css';
import { UpperBar } from './components/UpperBar.js';
import { Home } from './components/Home.js';
import { Products } from './components/Products.js';
import { PageNotFound } from './components/PageNotFound.js';
import { TotalAmountContext } from './elements/cartContent.js';
import { CartContentContext } from './elements/cartContent.js';
import { Cart } from './components/Cart.js';
import { newCartContent } from './elements/productsList.js';
import { listaDeRutas } from './components/Rutas.js';
import { Ejecutar } from './components/Ejecutar.js';

class Main extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {
        return (
            <div>
                {document.title = 'Bici Negro'}
                <Router baseline='/'>
                    <div>
                        <UpperBar />
                        <Routes>
                            <Route path='/' element={<Outlet />}>
                                <Route index element={<Home />}></Route>
                                {
                                    listaDeRutas.map((ruta) => (
                                        <Route path={process.env.REACT_APP_FOR_PATH + ruta[1]} element={
                                            <Products
                                                firstCategory={ruta[0]}
                                                text={ruta[2]}
                                                route={ruta[1]}
                                            />
                                        }></Route>
                                    ))
                                }
                                <Route path={process.env.REACT_APP_FOR_PATH + '/carrito'} element={<Cart />}></Route>
                                <Route path={process.env.REACT_APP_FOR_PATH + '/ejecutar'} element={<Ejecutar />}></Route>
                                <Route path={process.env.REACT_APP_FOR_PATH + '*'} element={<PageNotFound />}></Route>
                            </Route>
                        </Routes>
                    </div>
                </Router >
            </div>
        )
    }
}

export const MainComponent = () => {
    const checkCart = () => {
        const previouslyExistentCart = Number(sessionStorage.getItem('cart-amount'));
        return typeof previouslyExistentCart != 'undefined' && previouslyExistentCart;
    }
    const [carterTotalAmount, setTotalAmount] = useState(checkCart);
    const utilitiesSet = useMemo(
        () => ({ carterTotalAmount, setTotalAmount }),
        [carterTotalAmount]
    );
    const [cartContent, setCartContent] = useState(newCartContent);
    const setForContentChanging = useMemo(
        () => ({ cartContent, setCartContent }),
        [cartContent]
    );
    return (
        <TotalAmountContext.Provider
            value={utilitiesSet}>
            <CartContentContext.Provider
                value={setForContentChanging}>
                <div>
                    <Main
                        key={98797686} />
                </div>
            </CartContentContext.Provider>
        </TotalAmountContext.Provider>
    )
}
