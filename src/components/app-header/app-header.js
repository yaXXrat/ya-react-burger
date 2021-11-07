import React from 'react'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css'
import MenuItem from './menu-item';

const AppHeader = () => {
    return (
      <header>
        <div className={style.container}>
          <nav>
              <MenuItem
                Icon={BurgerIcon}
                text="Конструктор"
              />
              <MenuItem
                Icon={ListIcon}
                text="Лента заказов"
              />
              <div>
                <Logo />
              </div>
              <MenuItem
                Icon={ProfileIcon}
                text="Личный кабинет"
              />
          </nav>
        </div>
      </header>    
    );
}

export default AppHeader;

