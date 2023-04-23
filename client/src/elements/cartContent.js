import React from 'react';

export const TotalAmountContext = React.createContext({
    carterTotalAmount: '',
    setTotalAmount: () => { }
});

export const CartContentContext = React.createContext({
    cartContent: '',
    setCartContent: () => { }
});

const refGenerator = () => {
    let randoms = [];
    for (let i = 0; i < 10; i++) {
        function findCoincidence() {
            const newRandom = Math.round(1008000 * 132 * Math.random());
            const coincidenceFound = randoms.find(el => el === newRandom);
            try {
                typeof coincidenceFound != 'undefined' ?
                    findCoincidence() : randoms = [...randoms, newRandom];
            } catch (e) {
                console.log('Error: GH1')
                console.log(e);
            }
        }
        findCoincidence();
    }
    const values = randoms;
    return values;
}

const createCartContentObject = (keys) => {
    const newEntries = keys.map((key) => [key, 0]);
    const newObject = Object.fromEntries(newEntries);
    return newObject;
}

export const getCartContent = () => {
    let cartContent = {};
    const returnNewReferences = () => {
        const references = refGenerator();
        cartContent = createCartContentObject(references);
        sessionStorage.setItem('cart-content', JSON.stringify(cartContent));
    }
    const returnOldReferences = () => {
        cartContent = JSON.parse(sessionStorage.getItem('cart-content'));
    }
    sessionStorage.getItem('cart-content') ?
        returnOldReferences() :
        returnNewReferences();
    return cartContent;
}
