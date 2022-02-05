import style from "./feed-order-details.module.css"
import classNames from 'classnames';
import {useSelector} from "../../services/hooks";
import { useParams } from "react-router-dom";
import { TOrdersState } from "../../services/reducers/orders";
import { TFeedOrder } from "../../services/types/orders";

const FeedOrderDetails = () => {
  const { orderId } = useParams<{ orderId?: string }>();

  const { orders } = useSelector<TOrdersState>(state => state.orders);

  let order: TFeedOrder = orders.filter(order => order._id === orderId)[0];

  if (!order) {
    return <></>
  }

  return (
      <div className={classNames(style['feed-order-block'])} >
        <div
          className={classNames('text', 'text_type_main-large', style.details)}
        >
          Детали заказа
        </div>
        <div>
          <h3 className={classNames(style['ingredient-details-image'], 'text', 'text_type_main-medium', 'pb-8')}>{order.fullname}</h3>
        </div>
      </div>
  );
};

export default FeedOrderDetails;
