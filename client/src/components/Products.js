import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import {
    Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row
} from 'reactstrap';
import { handcraftsList } from '../elements/handcraftsList.js';
import {
    TotalAmountContext,
    CartContentContext
} from '../elements/cartContent.js';
import { passToCommaFormat } from '../elements/someFunctions.js';
import { useResponsiveTools } from '../elements/someFunctions.js';
import { SocialNetworks } from './SocialNetworks.js';
import { Link as ReactLink } from 'react-router-dom';

const rowsList = [handcraftsList];

const useNewValues = () => {
    const [currentKey, getKey] = useState(999);
    const newKey = () => getKey(currentKey + 1);
    return newKey;
}

const Handcraft = (props) => {
    const { carterTotalAmount, setTotalAmount } = useContext(TotalAmountContext);
    const { cartContent, setCartContent } = useContext(CartContentContext);

    const handcraftReference = JSON.parse(
        sessionStorage.getItem('cart-content'))[props.refe];
    const [localAmount, getAmount] = useState(handcraftReference);

    const getLocalPrice = (operation) => {
        const localPriceWithDot = Math.round((localAmount + operation) * Number(
            props.priceInt + '.' + props.priceDecimal
        ) * 100) / 100;
        return passToCommaFormat(localPriceWithDot);
    }
    const [localPrice, setLocalPrice] = useState(getLocalPrice(0));

    const newKey = useNewValues();

    const generalOperator = (operation) => {
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
        localAmount > 0 && generalOperator(-1);
    }
    const increaseFunction = () => {
        generalOperator(1);
    }

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
                    } per unit
                </CardSubtitle>
                <CardText>
                    {props.description}
                </CardText>
                <div key={newKey} className="input-group">
                    <Button onClick={decreaseFunction}>-</Button>
                    <span className="input-group-text">{localAmount}</span>
                    <Button onClick={increaseFunction}>+</Button>
                    {
                        localAmount ?
                            <span className="input-group-text total-local">
                                ${localPrice}
                            </span> :
                            <br></br>
                    }
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
                        <Button className='disabled' onClick={() => { }}>{windowWidth >= 1180 ? "Anterior" : "<"}</Button>
                        <span className="input-group-text">{windowWidth >= 1180 ? "Página 1 de 1" : "1 de 1"}</span>
                        <Button className='disabled' onClick={() => { }}>{windowWidth >= 1180 ? "Siguiente" : ">"}</Button>
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
                <br></br>
                <h1 className='category-name'>{props.text}</h1>
                <br></br>
                <SetOfButtons />
                {
                    windowWidth < 768 && <br></br>
                }
                {rowsList.map((row) =>
                    <div className='container-fluid' key={row[0][4] + row[0][4]}>
                        <Row>
                            {row.map((handcraft) => (
                                <React.Fragment key={handcraft[4]}>
                                    <Col sm={windowWidth >= 768 ?
                                        '4' : windowWidth < 768 && windowWidth > 650 ?
                                            '6' : '12'}
                                        className='horizontal-margin'>
                                        <Handcraft
                                            refe={references[refCounter++]}
                                            title={handcraft[0]}
                                            subtitle={handcraft[2]}
                                            imageSource={handcraft[1]}
                                            description={handcraft[3]}
                                            priceInt={Number(handcraft[7])}
                                            priceDecimal={Number(handcraft[8])} />
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
            <SocialNetworks />
        </div>
    )
}
