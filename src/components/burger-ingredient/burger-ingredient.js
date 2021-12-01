import React from 'react'
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import style from './burger-ingredient.module.css';

import PropTypes from "prop-types";
import {ingredientPT} from '../../utils/proptypes';

const BurgerIngredient = ( { ingredient, className, displayIngredientInfo, selectedCount }) => {
    return (
        <div className={classNames(style[className])}>
            { (selectedCount !== 0) && <Counter count={selectedCount} size="default" />}
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
    ingredient: ingredientPT.isRequired,
    className: PropTypes.string.isRequired,
    displayIngredientInfo: PropTypes.func.isRequired
  };
  export default BurgerIngredient;
