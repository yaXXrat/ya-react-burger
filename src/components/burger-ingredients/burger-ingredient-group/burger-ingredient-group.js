
import React from 'react'
import style from './burger-ingredient-group.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import PropTypes from "prop-types";


const BurgerIngredientGroup = ( {title, ingredients, displayIngredientInfo } ) => {
    return (
        <>
            <h3 className='pt-10 mb-6 text text_type_main-medium'>{title}</h3>
            <div className={style['burger-ingredients-group']}>
            {ingredients.map((ingredient) => (
                <BurgerIngredient 
                    key={ingredient._id} 
                    ingredient={ingredient} 
                    className='burger-ingredient'
                    displayIngredientInfo={displayIngredientInfo} />
            ))}              
            </div>
        </>
    );
};

BurgerIngredientGroup.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.node.isRequired,
    displayIngredientInfo: PropTypes.func.isRequired,
  };

export default BurgerIngredientGroup;
