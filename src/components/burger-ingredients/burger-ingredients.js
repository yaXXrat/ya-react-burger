import {React, useRef, useState} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import classNames from 'classnames';
import style from './burger-ingredients.module.css';

import BurgerIngredientGroup from '../burger-ingredient-group/burger-ingredient-group';

import {useSelector} from "react-redux";

const ingredientGroups = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки'
};

const ingredientGroupsTypes = Object.keys(ingredientGroups);

const BurgerIngredients = () => {

    const ingredientsData = useSelector(store => store.burgerIngredients.allIngredients);

    const [currentIngredientsType, setCurrentIngredientsType] = useState(ingredientGroupsTypes[0]);
    const filteredIngredientsData = (type) => {
        return ingredientsData.filter(item => item.type === type);
    }

    const tabsRef = {
        bun: useRef(),
        sauce: useRef(),
        main: useRef()
    };

    const clickTab = (tab) => {
        setCurrentIngredientsType(tab);
        tabsRef[tab].current.scrollIntoView({ behavior: "smooth" });
      };

    function getRefTop(ref) {
        return (ref.current) ? ref.current.getBoundingClientRect().top : 0;
    }
    const groupContainerRef = useRef();
    const groupContainerTop = getRefTop(groupContainerRef);
    const updateTab = () => {
        const activeTab = Object.entries(tabsRef)
          .map(([tabName, tabRef]) => [
            tabName,
            Math.abs(groupContainerTop - getRefTop(tabRef)),
          ])
          .sort((a, b) => a[1] - b[1])[0][0];
        setCurrentIngredientsType(activeTab);    
    }
    return (
        <div className={style['burger-ingredients']}>
            <div className={classNames(style['burger-ingredients-title'],'mt-10 mb-5 text text_type_main-large ')}>
                Соберите бургер
            </div>
            <div className={style['burger-ingredients-selector']}>
            { ingredientGroupsTypes.map((type) => (
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
            <div ref={groupContainerRef} onScroll={updateTab} className={style['burger-ingredients-group-container']}>
            {ingredientGroupsTypes.map((group) => (
                <div 
                    key={group} 
                    ref={tabsRef[group]}
                >
                    <BurgerIngredientGroup
                        key={group} 
                        title={ingredientGroups[group]}
                        ingredients={filteredIngredientsData(group)}
                    />
                </div>
            ))}
            </div>
        </div>
    )
}

export default BurgerIngredients;
