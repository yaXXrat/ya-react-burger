import React from 'react'
import { useDispatch } from "react-redux";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import {ingredientPT} from '../../utils/proptypes';
import { REMOVE_ORDER_INGREDIENT } from '../../services/actions/orderActions';

const BurgerConstructorItem = ( { ingredient }) => {
    const dispatch = useDispatch();
    const removeConstructorItem = () => {
        dispatch({type: REMOVE_ORDER_INGREDIENT, ingredient: ingredient})
    }
    return (<>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    handleClose={removeConstructorItem}
                />    
            </>
        );
  };
  BurgerConstructorItem.propTypes = {
    ingredient: ingredientPT.isRequired,
  };
  export default BurgerConstructorItem;
