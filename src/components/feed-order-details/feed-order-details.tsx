import React from 'react';
import style from "./feed-order-details.module.css"
import classNames from 'classnames';
import {useSelector, useDispatch} from "../../services/hooks";
import { useLocation } from "react-router-dom";
import { getOrderInfo } from '../../services/api';


const FeedOrderDetails = () => {
  const dispatch = useDispatch();
  const { isLoaded, currentOrder  } = useSelector(store => store.serverOrder);
  const location = useLocation();
  const orderNumber = location.pathname.split('/')[location.pathname.split('/').length-1];

  if (currentOrder._id === "" && !isLoaded) {
    dispatch(getOrderInfo(orderNumber));
    return null;
  }  
  return (
      <div className={classNames(style['feed-order-block'])} >
        <div
          className={classNames('text', 'text_type_main-large', style.details)}
        >
          Детали заказа
        </div>
        <div>
          <h3 className={classNames(style['ingredient-details-image'], 'text', 'text_type_main-medium', 'pb-8')}>{currentOrder.fullname}</h3>
        </div>
      </div>
    )
};

export default FeedOrderDetails;
