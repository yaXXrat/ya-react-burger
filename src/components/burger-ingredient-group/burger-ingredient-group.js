
import React from 'react'
import { useSelector } from "react-redux";
import style from './burger-ingredient-group.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import PropTypes from "prop-types";
import {ingredientPT} from '../../utils/proptypes';

const BurgerIngredientGroup = ( {title, ingredients } ) => {

    const { orderIngredients, orderBun, orderBunSelected } = useSelector(store => store.orderIngredients);
    const allIngredients = orderBunSelected ? orderIngredients.concat(orderBun) : orderIngredients;

    const getSelectedCount = (id) => {
        let currentIngredient = allIngredients.filter(ingredient => ingredient._id === id);
        return currentIngredient ? currentIngredient.length : 0;
    }

    return (
        <>
            <h3 className='pt-10 mb-6 text text_type_main-medium'>{title}</h3>
            <div className={style['burger-ingredients-group']}>
            {ingredients.map((ingredient) => (
                <BurgerIngredient 
                    key={ingredient._id} 
                    ingredient={ingredient} 
                    className='burger-ingredient'
                    selectedCount={getSelectedCount(ingredient._id)}
                />
            ))}              
            </div>
        </>
    );
};

BurgerIngredientGroup.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPT).isRequired,
  };

export default BurgerIngredientGroup;
