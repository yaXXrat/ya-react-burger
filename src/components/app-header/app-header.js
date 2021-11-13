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
                    Icon={BurgerIcon}
                    text="Конструктор"
                    active={true}
                  />
                  <MenuItem
                    Icon={ListIcon}
                    text="Лента заказов"
                    active={false}
                  />
              </div>
              <div className={style.topdiv}>
                    <Logo />
              </div>
              <div className={style.topdiv}>
                <MenuItem
                    Icon={ProfileIcon}
                    text="Личный кабинет"
                    active={false}
                  />
              </div>
          </nav>
        </div>
      </header>    
    );
}

export default AppHeader;

