import React from 'react';
import style from './feed-order-short.module.css';
import {TFeedOrder} from "../../services/types/orders";
import { Link, useLocation } from "react-router-dom";

const FeedOrderShort = ( {data}: {data: TFeedOrder}) => {
    const location = useLocation();
// 
//    console.log(data);

    return (
        <div className={style['feed-info']}>
            <div className={style['main-block']}>
                <div className={style.group}>
                    <Link 
                        key={data.id}
                        to={{
                            pathname: `/feed/${data._id}`,
                            state: { background: location },
                        }}
                    >{data.fullname}<br/></Link>                    
                </div>

            </div>

        </div>

    )
}

export default FeedOrderShort;
