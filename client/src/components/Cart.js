import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle, Col, Row, Button
} from 'reactstrap';
import { TotalAmountContext, CartContentContext } from '../elements/cartContent.js';
import { productsList } from '../elements/productsList.js';
import { passToCommaFormat, useResponsiveTools, useAmountHandlers } from '../elements/someFunctions.js';
import { Link as ReactLink } from 'react-router-dom';

const PriceSetOfButtons = (props) => {

    /*
    const { carterTotalAmount, setTotalAmount } = useContext(TotalAmountContext);
    const { cartContent, setCartContent } = useContext(CartContentContext);
    const productReference = JSON.parse(
        sessionStorage.getItem('cart-content'))[props.refe];
    const [localAmount, getAmount] = useState(productReference);
    const getLocalPrice = (operation) => {
        const localPriceWithDot = Math.round((localAmount + operation) * Number(
            props.priceInt + '.' + props.priceDecimal
        ) * 100) / 100;
        return passToCommaFormat(localPriceWithDot);
    }
    const [localPrice, setLocalPrice] = useState(getLocalPrice(0));

    const amountHandler = (operation) => {
        getAmount(localAmount + operation);
        setTotalAmount(carterTotalAmount + operation);
        sessionStorage.setItem('cart-amount', carterTotalAmount + operation);
        let editableContentObject = JSON.parse(JSON.stringify(cartContent));
        editableContentObject[props.refe] = localAmount + operation;
        setCartContent(editableContentObject);
        sessionStorage.setItem('cart-content', JSON.stringify(editableContentObject));
        setLocalPrice(getLocalPrice(operation));
    }
    const decreaseFunction = () => localAmount > 0 && amountHandler(-1);
    const increaseFunction = () => amountHandler(1);
*/

    const {
        localPrice, localAmount, decreaseFunction, increaseFunction
    } = useAmountHandlers(props.refe, props.priceInt, props.priceDecimal);

    return (
        <div className='container-fluid' key='increase-decrease-buttons'>
            <Row>
                <Col className="horizontal-alligned">
                    <div className="input-group mb-3 horizontal-alligned">
                        <Button className='increase-decrease-buttons' onClick={decreaseFunction}>-</Button>
                        <span className="input-group-text">{localAmount}</span>
                        <Button className='increase-decrease-buttons' onClick={increaseFunction}>+</Button>
                        <span className="input-group-text total-local">${localPrice}</span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}


const Article = (props) => {
    // const [currentKey, getKey] = useState(9999);
    //    const newKey = () => getKey(currentKey + 1);
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
                        ${props.priceInt},{props.priceDecimal} por unidad
                    </CardSubtitle>
                    <PriceSetOfButtons
                        refe={props.refe}
                        priceInt={props.priceInt}
                        priceDecimal={props.priceDecimal}
                        totalPrice={props.localPrice}
                    ></PriceSetOfButtons>
                    {
                        /*
                        <div key={newKey} className="input-group mb-3">
                            <span className="input-group-text">{props.amount}</span>
                            <span className="input-group-text total-local">
                                ${props.localPrice}
                            </span>
                        </div>
                        */
                    }
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
            <SetOfButtons key={45347458} totalPrice={priceToCommaFormat()} />
            <br></br>
            {[props.content].map((row) =>
                <div className='container-fluid' key={row[0][4] + row[0][4]}>
                    <Row>
                        {row.map((product) => (
                            <React.Fragment key={product[4]}>
                                <Col sm={
                                    windowWidth > 1260 ? '3' :
                                        windowWidth <= 1260 && windowWidth > 660 ? '4' :
                                            windowWidth <= 660 && '6'}
                                    className='horizontal-margin'>
                                    <Article
                                        refe={product[5]}
                                        title={product[0]}
                                        subtitle={product[2]}
                                        imageSource={product[1]}
                                        description={product[3]}
                                        amount={product[6]}
                                        priceInt={product[7]}
                                        priceDecimal={product[8]}
                                        localPrice={priceToCommaFormat(
                                            product[6], product[7], product[8])} />
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
    const updatedProductsList = productsList.map((el) => [
        ...el.slice(0, 6),
        el[6] * 0 + updatedCartAmounts[value++],
        ...el.slice(7)
    ]);

    const onlyProductsInCart = updatedProductsList.filter((el) => el[6] > 0);
    const localPrices = onlyProductsInCart.map((el) => el[6] * Number(el[7] + '.' + el[8]));
    const totalPrice = localPrices.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
    );

    return (
        <div className='background'>
            {
                onlyProductsInCart.length > 0 ?
                    <HaveContentInCart
                        content={onlyProductsInCart}
                        totalPrice={totalPrice} /> :
                    <NoContentInCart />
            }
        </div>
    )
}
