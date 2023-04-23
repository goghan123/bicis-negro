import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle, Col, Row
} from 'reactstrap';
import { TotalAmountContext, CartContentContext } from '../elements/cartContent.js';
import { handcraftsList } from '../elements/handcraftsList.js';
import { passToCommaFormat, useResponsiveTools } from '../elements/someFunctions.js';
import { SocialNetworks } from './SocialNetworks.js';
import { Link as ReactLink } from 'react-router-dom';

const Article = (props) => {
    const [currentKey, getKey] = useState(9999);
    const newKey = () => getKey(currentKey + 1);
    return (
        <div>
            <Card height='50px' width='50px'>
                <CardImg
                    alt="illustrative_image"
                    src={props.imageSource} />
                <CardBody>
                    <CardTitle className="text-dark" tag="h5">
                        {props.title}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6" >
                        ${props.priceInt},{props.priceDecimal} per unit
                    </CardSubtitle>
                    <div key={newKey} className="input-group mb-3">
                        <span className="input-group-text">{props.amount}</span>
                        <span className="input-group-text total-local">
                            ${props.localPrice}
                        </span>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

const SetOfButtons = (props) => {
    const lastPageVisited = sessionStorage.getItem('last-page-visited');
    return (
        <div className='cart-set-of-buttons' key='orderButtons'>
            <ReactLink to={process.env.REACT_APP_FOR_PATH + lastPageVisited} className='btn btn-secondary'>
                Volver al catálogo
            </ReactLink>
            <span className="input-group-text side-margins multiline">
                Total: ${props.totalPrice}
            </span>
            <ReactLink type='button' to={process.env.REACT_APP_FOR_PATH + "/ejecutar"} className='btn btn-secondary'>
                Continuar
            </ReactLink>
        </div>
    )
}

const HaveContentInCart = (props) => {
    const priceToCommaFormat = (amount, priceInt, priceDecimal) => {
        const priceWithDot = typeof amount === 'undefined' ?
            props.totalPrice :
            Math.round(amount * Number(
                priceInt + '.' + priceDecimal
            ) * 100) / 100;
        return passToCommaFormat(priceWithDot);
    }
    const { windowWidth } = useResponsiveTools();
    return (
        <div className='content-in-cart' key='haveContentInCart'>
            <br></br>
            <br></br>
            <br></br>
            <SetOfButtons key={0} totalPrice={priceToCommaFormat()} />
            <br></br>
            {[props.content].map((row) =>
                <div className='container-fluid' key={row[0][4] + row[0][4]}>
                    <Row>
                        {row.map((handcraft) => (
                            <React.Fragment key={handcraft[4]}>
                                <Col sm={
                                    windowWidth > 1260 ? '3' :
                                        windowWidth <= 1260 && windowWidth > 660 ? '4' :
                                            windowWidth <= 660 && '6'}
                                    className='horizontal-margin'>
                                    <Article
                                        refe={handcraft[5]}
                                        title={handcraft[0]}
                                        subtitle={handcraft[2]}
                                        imageSource={handcraft[1]}
                                        description={handcraft[3]}
                                        amount={handcraft[6]}
                                        priceInt={handcraft[7]}
                                        priceDecimal={handcraft[8]}
                                        localPrice={priceToCommaFormat(
                                            handcraft[6], handcraft[7], handcraft[8])} />
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                </div>
            )}
        </div>
    )
}

const NoContentInCart = () => {
    return (
        <div key='noContentInCart' className='App-header'>
            <h1>Cart is still empty</h1>
            <div className="right-oriented">
                <ReactLink type='button' to={process.env.REACT_APP_FOR_PATH + "/products"} replace className='btn btn-secondary'>
                    ¡Al catálogo!
                </ReactLink>
            </div>
        </div>
    )
}

export const Cart = () => {
    const { setTotalAmount } = useContext(TotalAmountContext);
    const { cartContent } = useContext(CartContentContext);
    setTotalAmount(Object.values(cartContent).reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
    ));
    const updatedCartAmounts = Object.values(cartContent);
    let value = 0;
    const updatedHandcraftsList = handcraftsList.map((el) => [
        ...el.slice(0, 6),
        el[6] * 0 + updatedCartAmounts[value++],
        ...el.slice(7)
    ]);

    const onlyHandcraftsInCart = updatedHandcraftsList.filter((el) => el[6] > 0);
    const localPrices = onlyHandcraftsInCart.map((el) => el[6] * Number(el[7] + '.' + el[8]));
    const totalPrice = localPrices.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
    );

    return (
        <div className='background'>
            {
                onlyHandcraftsInCart.length > 0 ?
                    <HaveContentInCart
                        content={onlyHandcraftsInCart}
                        totalPrice={totalPrice} /> :
                    <NoContentInCart />
            }
            <SocialNetworks />
        </div>
    )
}
