import React from 'react'

import classNames from 'classnames';
import style from './feed-list.module.css';
import FeedOrderShort from "../feed-order-short/feed-order-short";
import {TOrdersState} from "../../services/reducers/orders";

const FeedList = ( {data}: {data: TOrdersState})=> {

    return (
        <div className={style['feed-list']}>
            <div className={classNames(style['feed-list-title'],'mt-10 mb-5 text text_type_main-large ')}>
                Лента заказов
            </div>
            <div className={style['group']}>

                { data.orders.map( (order) => (
                    <FeedOrderShort
                        data={order}
                        key={order.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default FeedList;
