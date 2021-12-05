import React from 'react'
import { useDrag } from 'react-dnd';
import { useDispatch } from "react-redux";
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import style from './burger-ingredient.module.css';

import PropTypes from "prop-types";
import {ingredientPT} from '../../utils/proptypes';

import { SET_CURRENT_INGREDIENT } from '../../services/actions/ingredients';
  

const BurgerIngredient = ( { ingredient, className, selectedCount }) => {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient
    });

    const dispatch = useDispatch();
    const displayIngredientInfo = () => {
        dispatch({type: SET_CURRENT_INGREDIENT, id: ingredient._id})
    }
    return (
        <div ref={dragRef} className={classNames(style[className])}>
            { (selectedCount !== 0) && <Counter count={selectedCount} size="default" />}
            <img
                alt={ingredient.name}
                className={classNames(style['burger-ingredient-image'] )}
                src={ingredient.image}
                onClick={() => displayIngredientInfo()}
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
  };
  export default BurgerIngredient;
