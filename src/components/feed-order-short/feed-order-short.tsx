import React from 'react';
import style from './feed-order-short.module.css';
import {TFeedOrder} from "../../services/types/orders";
import { Link, useLocation } from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";
import {TIngredient} from "../../services/types/types";

const FeedOrderShort = ( {data}: {data: TFeedOrder}) => {
    const location = useLocation();

    const { allIngredients } = useSelector(state => state.burgerIngredients);
    const allIngredientsArray = allIngredients as TIngredient[];

    const findUrl = (id: string) => {
        const i = allIngredientsArray.find( ingredient => ingredient._id === id );
        if(i) return i.image_mobile; else return '';
    }

    const bg = "https://code.s3.yandex.net/react/code/bun-02-mobile.png";
    const date: Date = new Date(data.createdAt);
    return (
        <div className={style.nohref}><Link
            to={{
                pathname: `/feed/${data._id}`,
                state: { background: location },
            }}
        ><div className={style['feed-order-short'] + ' text_type_main-medium'}>
                    <div className={'text text_type_digits-default'}>#{data.id.toString().padStart(5, '0')}</div>
                 <div className={'text text_type_main-small text_color_inactive'}>{date.toLocaleString().slice(0,17)}</div>
            <div className={style.fullname}>{data.fullname}</div>
            <div className={style.ingredients}>

                { data.ingredientIds.map( (id, index) => (
                    index<6 &&  <div className={style.ingredient + ' ' + style['i'+(index+1).toString()]} key={index}><div><img src={findUrl(id)} alt={""}/></div></div>
                ))}

                {data.ingredientIds.length>6 && <div className={style.ingredient + ' ' + style.i7 }><div className={'text text_type_main-default '}>+{data.ingredientIds.length-5}</div></div>}
            </div>
                <div className={style.fullname + 'text text_type_digits-default'}>{data.total}&nbsp;<CurrencyIcon type="primary" /></div>
        </div>
        </Link>
        </div>
    )
}

export default FeedOrderShort;
