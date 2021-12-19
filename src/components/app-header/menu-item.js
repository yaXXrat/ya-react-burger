import React from 'react'
import style from './app-header.module.css'
import PropTypes from "prop-types";

import { Link, useRouteMatch } from "react-router-dom";

const MenuItem = ({ itemDest, Icon, itemText }) => {
    const match = useRouteMatch(itemDest);
    const isActive = match ? match.isExact : false;
    const classes = isActive ? style.active : "";
    return (
        <div className={ style.menu_item }>
            <Link to={itemDest}>
                <Icon type={ isActive ? "primary" : "secondary"}/>
                <span className={'text text_type_main-default pl-2 ' + classes} >{itemText}</span>
            </Link>
        </div>
    )
}

MenuItem.propTypes = {
    itemDest: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired,
    itemText: PropTypes.string.isRequired,
  };
  
export default MenuItem;
