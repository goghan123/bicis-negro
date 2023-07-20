import 'bootstrap/dist/css/bootstrap.css';
import '../styles.css';
import { Link as ReactLink } from 'react-router-dom';
import {
    DropdownToggle, DropdownMenu, DropdownItem, Dropdown,
} from 'reactstrap';

export const Categories = (props) => {
    return (
        < Dropdown isOpen={props.categoryStatus} toggle={props.openClose}
            onMouseEnter={props.openClose} onMouseLeave={props.openClose} nav inNavbar >
            <DropdownToggle
                className='first-category-button navbar-custom'>{props.text}</DropdownToggle>
            <DropdownMenu>
                {
                    props.secondCategories.map((subcategory) => (
                        <DropdownItem>
                            <ReactLink
                                to={process.env.REACT_APP_FOR_PATH + '/' + subcategory[1]} alt='404'>{subcategory[0]}
                            </ReactLink>
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </Dropdown >
    )
}



