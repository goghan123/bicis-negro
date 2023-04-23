import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import {
    Nav, NavItem, Navbar, Collapse, NavbarBrand, NavbarToggler
} from 'reactstrap';
import carty from '../elements/images/changuito-negro.svg';
import { TotalAmountContext } from '../elements/cartContent.js';
import { useResponsiveTools } from '../elements/someFunctions.js';
import { Link as ReactLink } from 'react-router-dom';
import { FirstCategory, BikesSubcategories, ComponentsSubcategories, ApparelSubcategories, AccesoriesSubcategories } from './Sub-categories.js';

export const UpperBar = () => {
    const { hideItems, itemsAreVisible, windowWidth } = useResponsiveTools();
    const { carterTotalAmount } = useContext(TotalAmountContext);

    const [bikesStatus, setBikesStatus] = useState(false);
    const [componentsStatus, setComponentsStatus] = useState(false);
    const [accesoriesStatus, setAccesoriesStatus] = useState(false);
    const [apparelsStatus, setApparelsStatus] = useState(false);

    const openBikes = () => {
        bikesStatus === true ? setBikesStatus(false) : setBikesStatus(true);
    }
    const openComponents = () => {
        componentsStatus === true ? setComponentsStatus(false) : setComponentsStatus(true);
    }
    const openAccesories = () => {
        accesoriesStatus === true ? setAccesoriesStatus(false) : setAccesoriesStatus(true);
    }
    const openApparels = () => {
        apparelsStatus === true ? setApparelsStatus(false) : setApparelsStatus(true);
    }

    return (
        <div>
            {
                windowWidth < 768 &&
                <div className='brand-container'>
                    <ReactLink to={process.env.REACT_APP_FOR_PATH + '/'} className='h4 brand-class text-dark'>Rafaela</ReactLink>
                </div>
            }
            <Navbar color="warning" expand="md" fixed="top" light className="fw-bold py-2 navbar-class">
                <NavbarToggler className='bar-toggler' onClick={hideItems} />
                {
                    windowWidth < 768 &&
                    < NavbarBrand className='h4 full-right no-underlining'>
                        <ReactLink to={process.env.REACT_APP_FOR_PATH + '/carrito'} className='text-dark no-underlining'>
                            <img src={carty} alt='cart' className='medium-logo'></img>
                            {carterTotalAmount}
                        </ReactLink>
                    </NavbarBrand>
                }
                <Collapse navbar isOpen={itemsAreVisible}>
                    <Nav className="me-auto" navbar>
                        {
                            windowWidth >= 768 &&
                            <NavItem>
                                <ReactLink className='text-dark navbar-custom' to={"/"}>
                                    Marca del Negro
                                </ReactLink>
                            </NavItem>
                        }
                        <FirstCategory
                            text={'Bicicletas'}
                            openCategory={openBikes}
                            categoryStatus={bikesStatus}
                            secondCategories={<BikesSubcategories />}
                        ></FirstCategory>
                        <FirstCategory
                            text={'Componentes'}
                            openCategory={openComponents}
                            categoryStatus={componentsStatus}
                            secondCategories={<ComponentsSubcategories />}
                        ></FirstCategory>
                        <FirstCategory
                            text={'Accesorios'}
                            openCategory={openAccesories}
                            categoryStatus={accesoriesStatus}
                            secondCategories={<AccesoriesSubcategories />}
                        ></FirstCategory>
                        <FirstCategory
                            text={'Aparejos'}
                            openCategory={openApparels}
                            categoryStatus={apparelsStatus}
                            secondCategories={<ApparelSubcategories />}
                        ></FirstCategory>
                        {/*
                        <ReactLink className={windowWidth >= 768 ? 'text-dark navbar-custom' : 'text-dark navbar-custom-list'} to={process.env.REACT_APP_FOR_PATH + '/products'}>
                            Our products
                        </ReactLink>
                        */
                        }
                    </Nav>
                    {itemsAreVisible && <hr></hr>}
                </Collapse>
                {
                    windowWidth >= 768 &&
                    < NavbarBrand className='h4 full-right'>
                        <ReactLink to={process.env.REACT_APP_FOR_PATH + '/carrito'} className='text-dark no-underlining'>
                            <img src={carty} alt='cart' className='medium-logo'></img>
                            {carterTotalAmount}
                        </ReactLink>
                    </NavbarBrand>
                }
            </Navbar>
        </div >
    )
}
