import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import { Link as ReactLink } from 'react-router-dom';
import { Card, CardBody, Collapse, Button } from 'reactstrap';

export const SecondCategory = (props) => {
    return (
        <ReactLink to={process.env.REACT_APP_FOR_PATH + '/' + props.link} alt='404'>{props.text}</ReactLink>
    )
}

export const FirstCategory = (props) => {
    return (
        <div>
            <Button onClick={props.openCategory}>{props.text}</Button>
            <Collapse isOpen={props.categoryStatus} toggler="#toggler">
                <Card>
                    <CardBody>
                        {props.secondCategories}
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export const BikesSubcategories = () => {
    return (
        <div>
            <SecondCategory
                text={'Ver por marca'}
                link={'bicicletas-por-marca'}
            ></SecondCategory>
            <SecondCategory
                text={'Bicicletas de ruta'}
                link={'de-ruta'}
            ></SecondCategory>
            <SecondCategory
                text={'Mountain bikes'}
                link={'de-montana'}
            ></SecondCategory>
            <SecondCategory
                text={'Active bikes'}
                link={'active'}
            ></SecondCategory>
            <SecondCategory
                text={'Para niños'}
                link={'ninos'}
            ></SecondCategory>
            <SecondCategory
                text={'Eléctricas'}
                link={'electricas'}
            ></SecondCategory>
        </div>
    )
}

export const ComponentsSubcategories = () => {
    return (
        <div>
            <SecondCategory
                text={'Brakes'}
                link={'brakes'}
            ></SecondCategory>
            <SecondCategory
                text={'Chains & cassettes'}
                link={'chains-and-cassettes'}
            ></SecondCategory>
            <SecondCategory
                text={'Cranksets & bottom brackets'}
                link={'cranksets-and-bottom-brackets'}
            ></SecondCategory>
            <SecondCategory
                text={'Derailleurs & shifters'}
                link={'derailleurs-and-shifters'}
            ></SecondCategory>
            <SecondCategory
                text={'Frame parts'}
                link={'frame-parts'}
            ></SecondCategory>
            <SecondCategory
                text={'Forks / headsets / stems / shocks'}
                link={'forks-headsets-stems-shocks'}
            ></SecondCategory>
            <SecondCategory
                text={'Handlebars & grips'}
                link={'handlebars-and-grips'}
            ></SecondCategory>
            <SecondCategory
                text={'Maintenance'}
                link={'maintenance'}
            ></SecondCategory>
            <SecondCategory
                text={'Pedals & cleats'}
                link={'pedals-and-cleats'}
            ></SecondCategory>
            <SecondCategory
                text={'Saddles & seatposts'}
                link={'saddles-and-seatposts'}
            ></SecondCategory>
            <SecondCategory
                text={'Wheels & tires'}
                link={'wheels-and-tires'}
            ></SecondCategory>
        </div>
    )
}

export const ApparelSubcategories = () => {
    return (
        <div>
            <SecondCategory
                text={'Ver por marca'}
                link={'aparejos-por-marca'}
            ></SecondCategory>
            <SecondCategory
                text={'Tops'}
                link={'tops'}
            ></SecondCategory>
            <SecondCategory
                text={'Bottoms'}
                link={'bottoms'}
            ></SecondCategory>
            <SecondCategory
                text={'Accesorios'}
                link={'apparel-accesories'}
            ></SecondCategory>
            <SecondCategory
                text={'Cascos'}
                link={'cascos'}
            ></SecondCategory>
            <SecondCategory
                text={'Shoes'}
                link={'shoes'}
            ></SecondCategory>
        </div>
    )
}

export const AccesoriesSubcategories = () => {
    return (
        <div>
            <SecondCategory
                text={'Electronics'}
                link={'electronics'}
            ></SecondCategory>
            <SecondCategory
                text={'Hydratation'}
                link={'hydratation'}
            ></SecondCategory>
            <SecondCategory
                text={'Storage & travel'}
                link={'storage-and-travel'}
            ></SecondCategory>
            <SecondCategory
                text={'Safety & security'}
                link={'safety-and-security'}
            ></SecondCategory>
            <SecondCategory
                text={'Health & recovery'}
                link={'health-and-recovery'}
            ></SecondCategory>
            <SecondCategory
                text={'Trailers & strollers'}
                link={'trailers-and-strollers'}
            ></SecondCategory>
            <SecondCategory
                text={'Trainers'}
                link={'trainers'}
            ></SecondCategory>
            <SecondCategory
                text={'Media & resources'}
                link={'media-and-resources'}
            ></SecondCategory>
        </div>
    )
}
