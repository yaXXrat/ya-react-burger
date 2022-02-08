import React,{ useCallback } from 'react';
import style from './burger-constructor.module.css';
import { Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from 'react-dnd';

import { UPDATE_INGREDIENTS_ORDER, SET_ORDER_INGREDIENT } from '../../services/constants/constructor';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import BurgerBunConstructorItem from '../burger-bun-constructor-item/burger-bun-constructor-item';

import { createOrder } from '../../services/api';
import { useHistory } from "react-router-dom";
import {TBurgerConstructorItem, TIngredient} from "../../services/types/types";
import {useDispatch, useSelector} from "../../services/hooks";
import {TConstructorState} from "../../services/reducers/constructor";
const BurgerConstructor = () => {


    const dispatch = useDispatch();
    const history = useHistory();
    const  { user } = useSelector(state => state.auth);
    const { constructorIngredients, constructorBun } = useSelector<TConstructorState>(state => state.orderConstructor);
    const allIngredients = constructorBun ? constructorIngredients.concat(constructorBun) : constructorIngredients;
    const calcTotalPrice = (ingredients: TBurgerConstructorItem[]) => ingredients.reduce((acc, current) => acc + current.ingredient.price, 0);
    const totalPrice = calcTotalPrice(allIngredients);

    function makeOrder() {
        if(user.name!==""){
            const ingredientsIDs = {"ingredients": constructorIngredients.map(item => item.ingredient._id).concat(constructorBun ? constructorBun.ingredient._id : '')};
            dispatch(createOrder(ingredientsIDs, totalPrice));
        }else{
            history.push("/login");
        }
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({type: UPDATE_INGREDIENTS_ORDER, dragIndex: dragIndex, hoverIndex: hoverIndex});
    }, [dispatch]);

    const onDropHandler = (ingredient: TIngredient) => {
        dispatch({type: SET_ORDER_INGREDIENT, ingredient: ingredient})
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            onDropHandler(ingredient as TIngredient);
        }
    });

    return (
        <div ref={dropTarget} className={style['burger-constructor']}>
            <div className={style['main-block']}>
                { constructorBun && <div className={style.bun}><BurgerBunConstructorItem
                    type="top"
                    ingredient={constructorBun.ingredient}
                /></div>}

        <div className={style.group}>
            {
                constructorIngredients.map((item: TBurgerConstructorItem, i: number) => (
                    <BurgerConstructorItem ingredient={item.ingredient}
                    moveCard={moveCard} index={i} id={item.id} key={item.index}/>
            ))}
        </div>

        { constructorBun && <div className={style.bun}><BurgerBunConstructorItem
            type="bottom"
            ingredient={constructorBun.ingredient}
        /></div>}
         </div>

            {totalPrice > 0 && <div className={style.sum}>
                <span className="text text_type_digits-medium">{totalPrice}&nbsp;</span>
                <span className="svg_large"><CurrencyIcon type="primary" /></span>
                <div className={style.px40}>&nbsp;</div>
                {constructorBun && <Button
                    type="primary"
                    size="medium"
                    onClick={() => makeOrder()}
                >
                    Оформить заказ
                </Button>}
            </div>}
            {!constructorBun && totalPrice > 0 && <div className="text text_type_main-default text_color_inactive empty_constructor">Пожалуйста, для оформления заказа выберите булку</div>}
            {totalPrice === 0 && <div className="text text_type_main-default text_color_inactive empty_constructor">
                Пожалуйста, для начала конструирования бургера выберите и&nbsp;перетащите булку сюда:
                </div>
            }
            </div>

    )    
}

export default BurgerConstructor;
