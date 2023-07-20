import { useState, useEffect, useContext } from 'react';
import { CartContentContext, TotalAmountContext } from './cartContent.js';

export const passToCommaFormat = (numberWithDot) => {
    const numberToArray = [...JSON.stringify(numberWithDot)];
    const dotPosition = numberToArray.indexOf('.') === -1 ?
        numberToArray.length + 1 : numberToArray.indexOf('.');
    const decimals = typeof numberToArray[dotPosition + 1] === 'undefined' ?
        '00' : numberToArray[dotPosition + 1] + '0';
    const ints = Math.floor(numberWithDot);
    return JSON.stringify(ints) + ',' + decimals;
}

export const useResponsiveTools = () => {
    const [itemsAreVisible, setItemsVisibility] = useState(false);
    const hideItems = () => setItemsVisibility(!itemsAreVisible);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const changeWindowWidth = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', changeWindowWidth);
        return () => window.removeEventListener('resize', changeWindowWidth);
    });
    useEffect(() => {
        windowWidth < 768 && setItemsVisibility(false);
    }, [windowWidth]);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const changeWindowHeight = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', changeWindowHeight);
        return () => window.removeEventListener('resize', changeWindowHeight);
    })
    return { hideItems, itemsAreVisible, windowWidth, windowHeight };
}



export const useAmountHandlers = (ref, priceInt, priceDecimal) => {
    const productReference = JSON.parse(
        sessionStorage.getItem('cart-content'))[ref];
    const [localAmount, getAmount] = useState(productReference);
    const { carterTotalAmount, setTotalAmount } = useContext(TotalAmountContext);
    const { cartContent, setCartContent } = useContext(CartContentContext);
    const getLocalPrice = (operation) => {
        const localPriceWithDot = Math.round((localAmount + operation) * Number(
            priceInt + '.' + priceDecimal
        ) * 100) / 100;
        return passToCommaFormat(localPriceWithDot);
    }
    const [localPrice, setLocalPrice] = useState(getLocalPrice(0));
    const amountHandler = (operation) => {
        getAmount(localAmount + operation);
        setTotalAmount(carterTotalAmount + operation);
        sessionStorage.setItem('cart-amount', carterTotalAmount + operation);
        let editableContentObject = JSON.parse(JSON.stringify(cartContent));
        editableContentObject[ref] = localAmount + operation;
        setCartContent(editableContentObject);
        sessionStorage.setItem('cart-content', JSON.stringify(editableContentObject));
        setLocalPrice(getLocalPrice(operation));
    }
    const decreaseFunction = () => {
        localAmount > 0 && amountHandler(-1);
    }
    const increaseFunction = () => {
        amountHandler(1);
    }
    return { localPrice, localAmount, decreaseFunction, increaseFunction }
}
