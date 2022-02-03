import React, { useEffect } from 'react';
import { useDispatch } from '../services/hooks';
import { wsClose } from '../services/actions/websocket';
import { fetchAllOrders } from '../services/api';

function FeedPage() {
    const resp = 'AAA';
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('fetchAllOrders =>');
        dispatch(fetchAllOrders());
      return () => { dispatch(wsClose()) }
    }, [dispatch]);
  

    return (
        <>{resp}</>
    )
}

export default FeedPage;