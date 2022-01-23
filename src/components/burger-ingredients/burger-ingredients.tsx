import React, { useCallback, useRef, useState, useMemo, createRef} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import classNames from 'classnames';
import style from './burger-ingredients.module.css';

import BurgerIngredientGroup from '../burger-ingredient-group/burger-ingredient-group';

import {useSelector} from "react-redux";

import { throttle } from '../../utils/throttle';
import {TGroup, TIngredient} from "../../utils/types";

const ingredientGroups: TGroup[]  = [
    {type: 'bun', title: 'Булки'},
    {type: 'sauce', title: 'Соусы'},
    {type: 'main', title: 'Начинки'},
];

const BurgerIngredients = () => {

    const ingredientsData = useSelector((store: any) => store.burgerIngredients.allIngredients);

    const [currentIngredientsType, setCurrentIngredientsType] = useState<string>('bun');
    const filteredIngredientsData = (type: string) => {
        return ingredientsData.filter((item: TIngredient) => item.type === type);
    }

    const tabsRef: Record<string, React.MutableRefObject<any>> = useMemo( () => (
        {
        bun: createRef(),
        sauce: createRef(),
        main: createRef()
        }
    ), []);

    const clickTab = (tab: string) => {
        setCurrentIngredientsType(tab);
        tabsRef[tab].current.scrollIntoView({ behavior: "smooth" });
      };

    function getRefTop(ref: React.MutableRefObject<any>) {
        return (ref.current) ? ref.current.getBoundingClientRect().top : 0;
    }
    const groupContainerRef = useRef<HTMLDivElement>();
//    const groupContainerTop: number = getRefTop(groupContainerRef);

    const updateTab = useCallback( () => {
        const groupContainerTop = getRefTop(groupContainerRef);
        const activeTab = Object.entries(tabsRef)
          .map(([name, ref]): [string, number] => [
            name,
            Math.abs(groupContainerTop - ref.current.getBoundingClientRect().top),
          ])
          .sort((a, b) => a[1] - b[1])[0][0];

        setCurrentIngredientsType(activeTab);
    },[tabsRef]);

    const throttledUpdateTab = useMemo(() => throttle(updateTab, 250), [updateTab])

    return (
        <div className={style['burger-ingredients']}>
            <div className={classNames(style['burger-ingredients-title'],'mt-10 mb-5 text text_type_main-large ')}>
                Соберите бургер
            </div>
            <div className={style['burger-ingredients-selector']}>
                {ingredientGroups.map((group: TGroup) => (
                <Tab
                    key={group.title}
                    active={group.type === currentIngredientsType }
                    value={group.type}
                    onClick={() => clickTab(group.type)}
                >
                    {group.title}
                </Tab>
            ))}
            </div>
            <div onScroll={throttledUpdateTab} className={style['burger-ingredients-group-container']}>
                {ingredientGroups.map((group: TGroup) => (
                <div
                    ref={tabsRef[group.type]}
                    key={group.type}
                >
                    <BurgerIngredientGroup
                        title={group.title}
                        ingredients={filteredIngredientsData(group.type)}
                    />
                </div>
            ))}
            </div>
        </div>
    )
}

export default BurgerIngredients;
