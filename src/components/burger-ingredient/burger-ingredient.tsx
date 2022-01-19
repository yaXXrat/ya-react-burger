import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import style from './burger-ingredient.module.css';

import { Link, useLocation } from "react-router-dom";

type TIngredient = {
    name: string,
    price: number,
    image: any,
    _id: number
}

type TBurgerIngredient = {
    ingredient: TIngredient,
    className: string,
    selectedCount: number
}

const BurgerIngredient : FC<TBurgerIngredient> = ( { ingredient, className, selectedCount }) => {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });
    const location = useLocation();

    const ingredientId = ingredient._id;
  
    return (
        <div ref={dragRef} className={classNames(style[className], style['draggable'])}>
            { (selectedCount !== 0) && <Counter count={selectedCount} size="default" />}
            <Link
                key={ingredientId}
                to={{
                    pathname: `/ingredients/${ingredientId}`,
                    state: { background: location },
                }}
                className={style.link}
                >
                <img
                    alt={ingredient.name}
                    className={classNames(style['burger-ingredient-image'] )}
                    src={ingredient.image}
                />
            </Link>
            <div className={style.price}>
                <span className={classNames(style['burger-ingredient-price'], "text text_type_digits-default")}>{ingredient.price}&nbsp;
                <CurrencyIcon type={'primary'} />
            </span></div>
            <div className={classNames(style['burger-ingredient-title'], "text text_type_main-small")}>{ingredient.name}</div>
        </div>

    );
  };
  export default BurgerIngredient;
