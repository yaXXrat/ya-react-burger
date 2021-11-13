import React from 'react'
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import style from './burger-ingredient.module.css';

import PropTypes from "prop-types";

const BurgerIngredient = ( { data: { _id, image, name, price }, className }) => {
    return (
        <div className={classNames(style[className])}>
            { (_id === "60666c42cc7b410027a1a9b1"|| _id === "60666c42cc7b410027a1a9b9") && <Counter count={1} size="default" />}
            <img
                alt={name}
                className={classNames(style['burger-ingredient-image'] )}
                src={image}
            />            
            <div className={style.price}>
                <span className={classNames(style['burger-ingredient-price'], "text text_type_digits-default")}>{price}&nbsp;
                <CurrencyIcon type={'primary'} />
            </span></div>
            <div className={classNames(style['burger-ingredient-title'], "text text_type_main-small")}>{name}</div>
        </div>

    );
  };
  BurgerIngredient.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
  };
  export default BurgerIngredient;
