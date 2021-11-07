import React from 'react'
import style from './app-header.module.css'

const MenuItem = ({ Icon, text }) => {
    return (
        <div className={style.menu_item}>
            <Icon type={"secondary"}/>
            <span className='text text_type_main-default pl-2'>{text}</span>
        </div>
    )
}

export default MenuItem;