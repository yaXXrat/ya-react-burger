import React from 'react'
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import style from './burger-ingredient.module.css';

import PropTypes from "prop-types";

const BurgerIngredient = ( { ingredient, className, displayIngredientInfo }) => {
    return (
        <div className={classNames(style[className])}>
            { (ingredient._id === "60666c42cc7b410027a1a9b1"|| ingredient._id === "60666c42cc7b410027a1a9b9") && <Counter count={1} size="default" />}
            <img
                alt={ingredient.name}
                className={classNames(style['burger-ingredient-image'] )}
                src={ingredient.image}
                onClick={() => displayIngredientInfo(ingredient)}
            />            
            <div className={style.price}>
                <span className={classNames(style['burger-ingredient-price'], "text text_type_digits-default")}>{ingredient.price}&nbsp;
                <CurrencyIcon type={'primary'} />
            </span></div>
            <div className={classNames(style['burger-ingredient-title'], "text text_type_main-small")}>{ingredient.name}</div>
        </div>

    );
  };
  BurgerIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    displayIngredientInfo: PropTypes.func.isRequired
  };
  export default BurgerIngredient;
