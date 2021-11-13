import React from 'react'
import style from './app-header.module.css'

const MenuItem = ({ Icon, text, active }) => {
    let classes = active ? style.active : "";
    return (
        <div className={ style.menu_item }>
            <Icon type={ active ? "primary" : "secondary"}/>
            <span className={'text text_type_main-default pl-2 ' + classes} >{text}</span>
        </div>
    )
}

export default MenuItem;
