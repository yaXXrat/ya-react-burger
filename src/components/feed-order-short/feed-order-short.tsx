import React from 'react';
import style from './feed-order-short.module.css';
import {TFeedOrder} from "../../services/types/orders";
import { Link, useLocation } from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";
import {TIngredient} from "../../services/types/types";

const FeedOrderShort = ( {data, view}: {data: TFeedOrder, view: string}) => {
    const location = useLocation();

    const { allIngredients } = useSelector(state => state.burgerIngredients);
    const allIngredientsArray = allIngredients as TIngredient[];

    const findUrl = (id: string) => {
        const i = allIngredientsArray.find( ingredient => ingredient._id === id );
        if(i) return i.image_mobile; else return '';
    }

    const date: Date = new Date(data.createdAt);

    return (
        <div className={style.nohref}><Link
            to={{
                pathname: `/feed/${data.id}`,
                state: { background: location },
            }}
        ><div className={style['feed-order-short'] + ' text_type_main-medium'}>
                    <div className={'text text_type_digits-default'}>#{data.id.toString().padStart(5, '0')}</div>
                 <div className={'text text_type_main-small text_color_inactive'}>{date.toLocaleString().slice(0,17)}</div>
            <div className={style.fullname}>{data.fullname}</div>
            { view && data.status === 'done' && <div className={style.status + ' text_type_main-default '+ style.done}>Выполнен</div>}
            { view && data.status === 'created' && <div className={style.status + ' text_type_main-default'}>Создан</div>}
            { view && data.status === 'pending' && <div className={style.status + ' text_type_main-default'}>Готовится</div>}
            { view && data.status === 'cancelled' && <div className={style.status + ' text_type_main-default '+ style.cancel}>Отменен</div>}
            <div className={style.ingredients}>

                { data.ingredients.map( (id, index) => (
                    index<6 &&  <div className={style.ingredient + ' ' + style['i'+(index+1).toString()]} key={index}><div><img src={findUrl(id)} alt={""}/></div></div>
                ))}

                {data.ingredients.length>6 && <div className={style.ingredient + ' ' + style.i7 }><div className={'text text_type_main-default '}>+{data.ingredients.length-5}</div></div>}
            </div>
                <div className={style.fullname + 'text text_type_digits-default'}>{data.total}&nbsp;<CurrencyIcon type="primary" /></div>
        </div>
        </Link>
        </div>
    )
}

export default FeedOrderShort;
