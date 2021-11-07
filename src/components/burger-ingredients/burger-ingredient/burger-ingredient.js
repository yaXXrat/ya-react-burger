import React from 'react'
import {
    CurrencyIcon,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import clsn from 'classnames';
import style from './burger-ingredient.module.css';

import PropTypes from "prop-types";

const BurgerIngredient = ( { data: { image, name, price }, className }) => {
    return (
        <div className={clsn(style[className])}>
            <img
                alt={name}
                className={style['burger-ingredient-image']}
                src={image}
            />            
            <div className={clsn(style['burger-ingredient-price'])}>{price}</div>
            <div className={clsn(style['burger-ingredient-currency'])}>
                <CurrencyIcon type={'primary'} />
            </div>
            <div className={clsn(style['burger-ingredient-title'])}>{name}</div>
        </div>

    );
  };
  BurgerIngredient.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
  };
  export default BurgerIngredient;