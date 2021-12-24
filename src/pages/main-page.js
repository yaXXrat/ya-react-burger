//import React, { useEffect } from 'react';
import React from 'react';
import style from './shared.module.css'

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function MainPage() {
    return (
    <div>
      <div className={style.main_blocks}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
    )
}

export default MainPage;