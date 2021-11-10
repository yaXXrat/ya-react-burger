
import React from 'react'
import style from './burger-ingredient-group.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

const BurgerIngredientGroup = ( {title, ingredients } ) => {
    return (
        <>
            <h3 className='pt-10 mb-6 text text_type_main-medium'>{title}</h3>
            <div className={style['burger-ingredients-group']}>
            {ingredients.map((ingredient, idx) => (
                <BurgerIngredient 
                    key={idx} 
                    data={ingredient} 
                    className='burger-ingredient' />
            ))}              
            </div>
        </>
    );
  };
  
  export default BurgerIngredientGroup;
