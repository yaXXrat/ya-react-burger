import React from 'react';
import style from "./feed-order-details.module.css"
import classNames from 'classnames';
import {useSelector, useDispatch} from "../../services/hooks";
import {useParams} from "react-router-dom";
import {getOrderInfo} from '../../services/api';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../services/types/types";

const FeedOrderDetails = () => {
    const {orderId} = useParams<{ orderId?: string }>();
    console.log(orderId);
    const dispatch = useDispatch();
    const {currentOrder} = useSelector(store => store.serverOrder);

    if (currentOrder.id.toString() !== orderId) {
        dispatch(getOrderInfo(orderId));
    }
    const {allIngredients} = useSelector(state => state.burgerIngredients);
    const allIngredientsArray = allIngredients as TIngredient[];

    const findUrl = (id: string) => {
        const i = allIngredientsArray.find(ingredient => ingredient._id === id);
        if (i) return i.image_mobile; else return '';
    }

    const ingredientsMap = new Map();
    ingredientsMap.set('sum', 0);

    allIngredientsArray.map((ingredient) => {
        ingredientsMap.set(ingredient._id, ingredient);
        if (currentOrder.ingredients.find(item => item === ingredient._id)) ingredientsMap.set('sum', ingredientsMap.get("sum") + ingredient.price);
        return ingredientsMap;
    })


    const date: Date = new Date(currentOrder.createdAt);

    return (
        <div className={classNames(style['feed-order-block'])}>
            <div className={'text text_type_digits-default'}>#{currentOrder.id.toString().padStart(5, '0')}</div>
            <div className={style['feed-order-short'] + ' text_type_main-medium'}>
                <div className={style.fullname}>{currentOrder.fullname}</div>
                {currentOrder.status === 'done' &&
                <div className={style.status + ' text_type_main-default ' + style.done}>Выполнен</div>}
                {currentOrder.status === 'created' &&
                <div className={style.status + ' text_type_main-default'}>Создан</div>}
                {currentOrder.status === 'pending' &&
                <div className={style.status + ' text_type_main-default'}>Готовится</div>}
                {currentOrder.status === 'cancelled' &&
                <div className={style.status + ' text_type_main-default ' + style.cancel}>Отменен</div>}
                <div className={style.ingredients}>

                    {currentOrder.ingredients.map((id, index) => (

                        <div className={style.over + ' text_type_main-default'} key={index}>
                            <div className={style.ingredient + ' ' + style.i1}>
                                <div><img src={findUrl(id)} alt={""}/></div>
                            </div>
                            <div className={style.middle}>{ingredientsMap.get(id)?.name}</div>
                            <div
                                className={style.iprice + ' text_type_main-default'}>{ingredientsMap.get(id)?.price.toLocaleString('ru-ru', {minimumFractionDigits: 0})}&nbsp;
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={'text text_type_main-small text_color_inactive'}>
                    <br/>{date.toLocaleString().slice(0, 17)}</div>
                <div
                    className={style.date}>{ingredientsMap.get("sum").toLocaleString('ru-ru', {minimumFractionDigits: 0})}&nbsp;
                    <CurrencyIcon type="primary"/></div>

            </div>
        </div>
    )
};

export default FeedOrderDetails;
