import {React, useRef, useState} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import classNames from 'classnames';
import style from './burger-ingredients.module.css';

import BurgerIngredientGroup from './burger-ingredient-group/burger-ingredient-group';
import ingredientsData from '../../utils/data';

const ingredientGroups = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
};

const ingredientGroupsTypes = Object.keys(ingredientGroups);

const BurgerIngredients = ({ displayIngredientInfo }) => {
    const [currentIngredientsType, setCurrentIngredientsType] = useState(ingredientGroupsTypes[0]);
    const filteredIngredientsData = (type) => {
        return ingredientsData.filter(item => item.type === type);
    }

    const ingredientsRef = {
        bun: useRef(),
        sauce: useRef(),
        main: useRef()
    };

    const clickTab = (tab) => {
        setCurrentIngredientsType(tab);
        ingredientsRef[tab].current.scrollIntoView();
      };
    
    return (
        <div className={style['burger-ingredients']}>
            <div className={classNames(style['burger-ingredients-title'],'mt-10 mb-5 text text_type_main-large ')}>
                Соберите бургер
            </div>
            <div className={style['burger-ingredients-selector']}>
            {ingredientGroupsTypes.map((type) => (
                <Tab
                    key={type}
                    active={type === currentIngredientsType }
                    value={type}
                    onClick={() => clickTab(type)}
                >
                    {ingredientGroups[type]}
                </Tab>
            ))}
            </div>
            <div className={style['burger-ingredients-group-container']}>
            {ingredientGroupsTypes.map((group) => (
                <div key={group} ref={ingredientsRef[group]}>
                    <BurgerIngredientGroup
                        key={group} 
                        title={ingredientGroups[group]}
                        ingredients={filteredIngredientsData(group)}
                        displayIngredientInfo={displayIngredientInfo}
                    />
                </div>
            ))}
            </div>
        </div>
    )
}

export default BurgerIngredients;
