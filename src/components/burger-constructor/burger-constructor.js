import React,{ useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './burger-constructor.module.css';
import { Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from 'react-dnd';

import { UPDATE_INGREDIENTS_ORDER, SET_ORDER_INGREDIENT } from '../../services/actions/constructor';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import BurgerBunConstructorItem from '../burger-bun-constructor-item/burger-bun-constructor-item';

import { createOrder } from '../../services/api';
import { useHistory } from "react-router-dom";

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { user }  = useSelector(store => store.auth);
    const { constructorIngredients, constructorBun } = useSelector(store => store.orderConstructor);
    const allIngredients = constructorBun ? constructorIngredients.concat(constructorBun) : constructorIngredients;
    const calcTotalPrice = (ingredients) => ingredients.reduce((acc, current) => acc + current.price, 0);
    const totalPrice = calcTotalPrice(allIngredients);

    function makeOrder() {
        if(user.name!==""){
            const ingredientsIDs = {"ingredients": constructorIngredients.map(item => item._id).concat(constructorBun._id)};
            dispatch(createOrder(ingredientsIDs,totalPrice));
        }else{
            history.push("/login");
        }
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({type: UPDATE_INGREDIENTS_ORDER, dragIndex: dragIndex, hoverIndex: hoverIndex});
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
            <div className={style['main-block']}>
                { constructorBun && <div className={style.bun}><BurgerBunConstructorItem
                    type="top"
                    ingredient={constructorBun}
                /></div>}

        <div className={style.group}>
            {
                constructorIngredients.map((ingredient,i) => (
                    <BurgerConstructorItem ingredient={ingredient}
                    moveCard={moveCard} index={i} id={ingredient.id} key={ingredient.id}/>
            ))}
        </div>

        { constructorBun && <div className={style.bun}><BurgerBunConstructorItem
            type="bottom"
            ingredient={constructorBun}
        /></div>}
         </div>

            {totalPrice > 0 && <div className={style.sum}>
                <span className="text text_type_digits-medium">{totalPrice}&nbsp;</span>
                <span className="svg_large"><CurrencyIcon type="primary" /></span>
                <div className={style.px40}>&nbsp;</div>
                <Button
                    disabled={!constructorBun}
                    type="primary" 
                    size="medium"
                    onClick={() => makeOrder()}
                >
                    Оформить заказ
                </Button>
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
