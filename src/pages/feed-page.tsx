import React, { useEffect } from 'react';
import { useDispatch } from '../services/hooks';
import { wsClose } from '../services/actions/websocket';
import { fetchAllOrders } from '../services/api';

import { data } from '../utils/dataAll.json';

function FeedPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('fetchAllOrders =>');
        dispatch(fetchAllOrders());
      return () => { dispatch(wsClose()) }
    }, [dispatch]);
  

    return (
        <><ul>
            <li>Orders: {data.orders.length}</li>
            <li>Total: {data.total}</li>
            <li>Total today: {data.totalToday}</li>
        </ul>
        </>
    )
}

export default FeedPage;