import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row
} from 'reactstrap';
import { productsList } from '../elements/productsList.js';
import {
    TotalAmountContext,
    CartContentContext
} from '../elements/cartContent.js';
import { useResponsiveTools, useAmountHandlers } from '../elements/someFunctions.js';
import { Link as ReactLink } from 'react-router-dom';

const rowsList = [productsList];

/*
const useNewValues = () => {
    const [currentKey, getKey] = useState(999);
    const newKey = () => getKey(currentKey + 1);
    return newKey;
}
*/

const Product = (props) => {
    /*
    const productReference = JSON.parse(
        sessionStorage.getItem('cart-content'))[props.refe];
    const [localAmount, getAmount] = useState(productReference);
    const { carterTotalAmount, setTotalAmount } = useContext(TotalAmountContext);
    const { cartContent, setCartContent } = useContext(CartContentContext);

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
    const decreaseFunction = () => {
        localAmount > 0 && amountHandler(-1);
    }
    const increaseFunction = () => {
        amountHandler(1);
    }
*/
    const {
        localPrice, localAmount, decreaseFunction, increaseFunction
    } = useAmountHandlers(props.refe, props.priceInt, props.priceDecimal);

    return (
        <Card height='50px' width='50px'>
            <CardImg
                width='100%'
                alt="Img ilustrativa"
                src={props.imageSource} />
            <CardBody>
                <CardTitle tag="h5">
                    {props.title}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6" >
                    ${props.priceInt},{
                        props.priceDecimal === 0 ? '00' : props.priceDecimal
                    } por unidad
                </CardSubtitle>
                <CardText>
                    {props.description}
                </CardText>
                <div className='container-fluid' key='increase-decrease-buttons'>
                    <Row>
                        <Col className="horizontal-alligned">
                            <div className="input-group mb-3 horizontal-alligned">
                                <Button className='increase-decrease-buttons' onClick={decreaseFunction}>-</Button>
                                <span className="input-group-text">{localAmount}</span>
                                <Button className='increase-decrease-buttons' onClick={increaseFunction}>+</Button>
                                {
                                    !localAmount ||
                                    <span className="input-group-text total-local">
                                        ${localPrice}
                                    </span>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </CardBody>
        </Card>
    )
}

const SetOfButtons = () => {
    const { windowWidth } = useResponsiveTools();
    return (
        <div className='container-fluid' key='products-buttons'>
            <Row>
                {
                    windowWidth >= 768 &&
                    < Col sm='4'>
                        <div />
                    </Col>
                }
                <Col sm={windowWidth >= 768 ? '4' : '12'} className="horizontal-alligned">
                    <div className="input-group mb-3 horizontal-alligned">
                        <Button
                            className={`disabled ${windowWidth >= 1180 && "complete"}`}
                            onClick={() => { }}>
                            {windowWidth >= 1180 ? "Anterior" : "<"}
                        </Button>
                        <span className="input-group-text">{windowWidth >= 1180 ? "Página 1 de 1" : "1 de 1"}</span>
                        <Button
                            className={`disabled ${windowWidth >= 1180 && "complete"}`}
                            onClick={() => { }}>
                            {windowWidth >= 1180 ? "Siguiente" : ">"}
                        </Button>
                    </div>
                </Col>
                {
                    windowWidth < 768 &&
                    <Col sm='12'>
                        <div className="horizontal-alligned">
                            <ReactLink type='button' to={process.env.REACT_APP_FOR_PATH + "/carrito"} className='btn btn-secondary'>
                                Continuar al carrito
                            </ReactLink>
                        </div>
                    </Col>
                }
                {
                    windowWidth >= 768 &&
                    <Col sm="4">
                        <div className="horizontal-alligned">
                            <ReactLink type='button' to={process.env.REACT_APP_FOR_PATH + "/carrito"} className='btn btn-secondary'>
                                Continuar al carrito
                            </ReactLink>
                        </div>
                    </Col>
                }
            </Row>
        </div >
    )
}

export const Products = (props) => {
    const { setTotalAmount } = useContext(TotalAmountContext);
    const { cartContent } = useContext(CartContentContext);
    const references = Object.keys(cartContent);
    sessionStorage.setItem('last-page-visited', props.route);

    useEffect(() => {
        setTotalAmount(Object.values(cartContent).reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
        ));
    })

    let refCounter = 0;
    const { windowWidth } = useResponsiveTools();
    return (
        <div className='background'>
            <div className='margins' key='orderDiv'>
                <br></br>
                <br></br>
                <br></br>
                <h1 className='routing-text'>{props.firstCategory} &gt; {props.text}</h1>
                <h1 className='category-name'>{props.text}</h1>
                <br></br>
                <SetOfButtons />
                {
                    windowWidth < 768 && <br></br>
                }
                {rowsList.map((row) =>
                    <div className='container-fluid' key={row[0][4] + row[0][4]}>
                        <Row>
                            {row.map((product) => (
                                <React.Fragment key={product[4]}>
                                    <Col sm={windowWidth >= 768 ?
                                        '4' : windowWidth < 768 && windowWidth > 650 ?
                                            '6' : '12'}
                                        className='horizontal-margin'>
                                        <Product
                                            refe={references[refCounter++]}
                                            title={product[0]}
                                            subtitle={product[2]}
                                            imageSource={product[1]}
                                            description={product[3]}
                                            priceInt={Number(product[7])}
                                            priceDecimal={Number(product[8])} />
                                    </Col>
                                </React.Fragment>
                            ))}
                        </Row>
                    </div>
                )}
                <SetOfButtons />
            </div>
            {
                windowWidth < 768 &&
                <br></br>
            }
        </div>
    )
}
