import { useState, useEffect } from 'react';

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
    const hideItems = () => {
        setItemsVisibility(!itemsAreVisible);
    }
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const changeWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWindowWidth);
        return () => window.removeEventListener('resize', changeWindowWidth);
    });
    useEffect(() => {
        windowWidth < 768 && setItemsVisibility(false);
    }, [windowWidth]);

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const changeWindowHeight = () => {
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener('resize', changeWindowHeight);
        return () => window.removeEventListener('resize', changeWindowHeight);
    })
    return { hideItems, itemsAreVisible, windowWidth, windowHeight };
}
