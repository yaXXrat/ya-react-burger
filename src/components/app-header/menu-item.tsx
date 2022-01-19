import React from 'react'
import style from './app-header.module.css'
import { FC } from 'react';

import {Link, useLocation} from 'react-router-dom';
import {TMenuItem} from "../../utils/types";

const MenuItem: FC<TMenuItem> = ({ itemDest, Icon, itemText }) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const splitDestination = itemDest.split("/");
    const isActive = splitLocation[1] === splitDestination[1];
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

export default MenuItem;
