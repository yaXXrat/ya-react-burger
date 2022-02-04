import React from 'react';
import style from './feed-order-short.module.css';
import {TFeedOrder} from "../../services/types/orders";

const FeedOrderShort = ( {data}: {data: TFeedOrder}) => {

//    console.log(data);

    return (
        <div className={style['feed-info']}>
            <div className={style['main-block']}>
                <div className={style.group}>
                    {data.fullname}<br/>
                </div>

            </div>

        </div>

    )
}

export default FeedOrderShort;
