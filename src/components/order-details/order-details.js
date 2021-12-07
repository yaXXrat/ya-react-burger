import style from "./order-details.module.css"
import classNames from 'classnames';
import orderReady from '../../images/tick.png';
import {useSelector} from "react-redux";

const OrderDetails = () => {
  const order = useSelector(store => store.order.currentOrder)
  return (
    <div className={classNames(style['order-details'])}>
      <h2 className={classNames(style['order-h2'], 'text', 'text_type_digits-large')}>
        {order.number}
      </h2>
      <div className={classNames('text','text_type_main-medium')}>
        идентификатор заказа
      </div>
      <img src={orderReady} alt="Заказ принят" className={style.ready}/>
      <h3 className={classNames('text','text_type_main-small', 'm-1')}>
        Ваш заказ начали готовить
      </h3>
      <h3 className={classNames('text','text_type_main-default', ' text_color_inactive')}>
        Дождитесь готовности на орбитальной станции
      </h3>
    </div>
  );
};

export default OrderDetails;
