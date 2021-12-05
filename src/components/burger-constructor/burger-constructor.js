import React,{ useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './burger-constructor.module.css';
import { Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from 'react-dnd';


import { SET_ERROR_MESSAGE } from '../../services/actions/error';

import { MAKE_ORDER_REQUEST, MAKE_ORDER_ERROR, MAKE_ORDER_SUCCESS, UPDATE_ORDER, SET_ORDER_INGREDIENT } from '../../services/actions/order';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import BurgerBunConstructorItem from '../burger-bun-constructor-item/burger-bun-constructor-item';

const CREATE_ORDER_URL = "https://norma.nomoreparties.space/api/orders";

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const { orderIngredients, orderBun, orderBunSelected } = useSelector(store => store.orderIngredients);

    let allIngredients = orderBunSelected ? orderIngredients.concat(orderBun) : orderIngredients;
    const calcTotalPrice = (ingredients) => ingredients.reduce((acc, current) => acc + current.price, 0);
    let totalPrice = calcTotalPrice(allIngredients);

    function makeOrder() {
        const ingredientsIDs = {"ingredients": orderIngredients.map(item => item._id).concat(orderBun._id)};
        let newOrder = {
            number: 0,
            success: true,
            name: "",
            ingredients: [ingredientsIDs],
            price: totalPrice
        }
        dispatch({type:MAKE_ORDER_REQUEST});
        fetch(CREATE_ORDER_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredientsIDs)
        })
        .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Error happened during data fetching while order creation!");
            }
          })
          .then((results) => {
            newOrder.number = results.order.number
            newOrder.name = results.name
            newOrder.success = results.success
            if(results.success){
                dispatch({type:MAKE_ORDER_SUCCESS, order: newOrder});
            }else{
                throw new Error("Error happened during order creation!");
            }
          })
          .catch((e) => {
            dispatch({type:MAKE_ORDER_ERROR, error: e});
            dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name + ': ' + e.message});
          });
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({type: UPDATE_ORDER, dragIndex: dragIndex, hoverIndex: hoverIndex});
    }, [dispatch]);

    const onDropHandler = (ingredient) => {
        dispatch({type: SET_ORDER_INGREDIENT, ingredient: ingredient})    
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            onDropHandler(ingredient);
        }
    });

    return (
        <div ref={dropTarget} className={style['burger-constructor']}>
        {orderBunSelected &&
            <div className={style['main-block']}>
                { orderBun && <div className={style.bun}><BurgerBunConstructorItem
                    type="top"
                    ingredient={orderBun}
                /></div>}

        <div className={style.group}>
            {
                orderIngredients.map((ingredient,i) => (
                    <BurgerConstructorItem ingredient={ingredient}
                    moveCard={moveCard} index={i} id={ingredient.id} key={ingredient.id}/>
            ))}
        </div>

        { orderBun && <div className={style.bun}><BurgerBunConstructorItem
            type="bottom"
            ingredient={orderBun}
        /></div>}
         </div>
}
            <div className={style.sum}>
                <span className="text text_type_digits-medium">{totalPrice}&nbsp;</span>
                <span className="svg_large"><CurrencyIcon type="primary" /></span>
                <div className={style.px40}>&nbsp;</div>
                <Button
                    disabled={!orderBunSelected} 
                    type="primary" 
                    size="medium"
                    onClick={() => makeOrder()}
                >
                    Оформить заказ
                </Button>
            </div>

        </div>

    )    
}

export default BurgerConstructor;
