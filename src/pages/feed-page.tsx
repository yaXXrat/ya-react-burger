import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { wsClose } from '../services/actions/websocket';
import { fetchAllOrders } from '../services/api';
import style from './shared.module.css';

import FeedInfo from "../components/feed-info/feed-info";
import FeedList from "../components/feed-list/feed-list";
import { TOrdersState } from '../services/reducers/orders';

function FeedPage() {
    const dispatch = useDispatch();
    const orders = useSelector<TOrdersState>(state => state.orders);

    useEffect(() => {
        dispatch(fetchAllOrders());
      return () => { dispatch(wsClose()) }
    }, [dispatch]);
    
    return (
        <div className={style.main_blocks}>
            <FeedList data={orders} view={''}/>
            <FeedInfo data={orders}/>
        </div>
    )
}

export default FeedPage;
