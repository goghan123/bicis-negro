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
import { Categories } from './Categories.js';
import { accesoriesSubcategories, apparelSubcategories, bikesSubcategories, componentsSubcategories } from '../elements/subcategoriesList.js';

export const UpperBar = () => {
    const { hideItems, itemsAreVisible, windowWidth } = useResponsiveTools();
    const { carterTotalAmount } = useContext(TotalAmountContext);

    const [bikesStatus, setBikesStatus] = useState(false);
    const [componentsStatus, setComponentsStatus] = useState(false);
    const [accesoriesStatus, setAccesoriesStatus] = useState(false);
    const [apparelsStatus, setApparelsStatus] = useState(false);

    const openCloseBikes = () => setBikesStatus(bikesStatus ? false : true);
    const openCloseComponents = () => setComponentsStatus(componentsStatus ? false : true);
    const openCloseAccesories = () => setAccesoriesStatus(accesoriesStatus ? false : true);
    const openCloseApparels = () => setApparelsStatus(apparelsStatus ? false : true);

    return (
        <div>
            {
                windowWidth < 768 &&
                <div className='brand-container'>
                    <ReactLink to={process.env.REACT_APP_FOR_PATH + '/'} className='h4 brand-class text-dark'>BICI NEGRO</ReactLink>
                </div>
            }
            <Navbar expand="md" fixed="top" light className="fw-bold custom-navbar">
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
                <Collapse navbar isOpen={itemsAreVisible} className='nav-try'>
                    <Nav className="me-auto upperBar-container" navbar>
                        {
                            windowWidth >= 768 &&
                            <NavItem className='first-category-button enlace-principal navbar-custom'>
                                <ReactLink to={"/"}>
                                    BICI NEGRO
                                </ReactLink>
                            </NavItem>
                        }
                        <div className='inner-upperBar-container'>
                            <div>
                                <Categories
                                    text={'Bicicletas'}
                                    categoryStatus={bikesStatus}
                                    openClose={openCloseBikes}
                                    secondCategories={bikesSubcategories}
                                ></Categories>
                                <Categories
                                    text={'Componentes'}
                                    categoryStatus={componentsStatus}
                                    openClose={openCloseComponents}
                                    secondCategories={componentsSubcategories}
                                ></Categories>
                                <Categories
                                    text={'Accesorios'}
                                    categoryStatus={accesoriesStatus}
                                    openClose={openCloseAccesories}
                                    secondCategories={accesoriesSubcategories}
                                ></Categories>
                                <Categories
                                    text={'Aparejos'}
                                    categoryStatus={apparelsStatus}
                                    openClose={openCloseApparels}
                                    secondCategories={apparelSubcategories}
                                ></Categories>
                            </div>
                        </div>
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
