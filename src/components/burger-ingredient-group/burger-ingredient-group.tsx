
import React, { FC } from 'react'
import { useSelector } from "react-redux";
import style from './burger-ingredient-group.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

type TIngredient = {
    name: string,
    price: number,
    image: any,
    _id: number
}

type TBurgerIngredientGroup = {
    title: string,
    ingredients: Array<TIngredient>,
}

const BurgerIngredientGroup : FC<TBurgerIngredientGroup> = ( {title, ingredients } ) => {

    const { constructorIngredients, constructorBun } = useSelector((store: any) => store.orderConstructor);
    const allIngredients = constructorBun ? constructorIngredients.concat(constructorBun) : constructorIngredients;

    const getSelectedCount = (id: number) => {
        let currentIngredient = allIngredients.filter((ingredient: TIngredient) => ingredient._id === id);
        return currentIngredient ? currentIngredient.length : 0;
    }

    return (
        <>
            <h3 className='pt-10 mb-6 text text_type_main-medium'>{title}</h3>
            <div className={style['burger-ingredients-group']}>
                {ingredients.map((ingredient: TIngredient) => (
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

export default BurgerIngredientGroup;
