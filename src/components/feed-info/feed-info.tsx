import React from 'react';
import style from './feed-info.module.css';
import {TOrdersState} from "../../services/reducers/orders";

const FeedInfo = ( {data}: {data: TOrdersState}) => {

    return (
        <div className={style['feed-info']}>
            <div className={style['main-block']}>
                <div className={style.group}>
                    {data.total}<br/>
                    {data.todayTotal}<br/>
                </div>

            </div>

        </div>

    )
}

export default FeedInfo;
