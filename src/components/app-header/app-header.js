import React from 'react'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css'
import MenuItem from './menu-item';

const AppHeader = () => {
    return (
      <header>
        <div className={style.container}>
          <nav>
              <div className={style.topdiv}>
                  <MenuItem
                    itemDest="/" 
                    Icon={BurgerIcon}
                    itemText="Конструктор"
                  />
                  <MenuItem
                    itemDest="/list" 
                    Icon={ListIcon}
                    itemText="Лента заказов"
                  />
              </div>
              <div className={style.topdiv}>
                    <Logo />
              </div>
              <div className={style.topdiv}>
                <MenuItem
                    itemDest="/profile" 
                    Icon={ProfileIcon}
                    itemText="Личный кабинет"
                  />
              </div>
          </nav>
        </div>
      </header>    
    );
}

export default AppHeader;

