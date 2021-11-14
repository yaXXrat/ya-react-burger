import style from "./order-details.module.css"
import PropTypes from "prop-types";
import classNames from 'classnames';

const OrderDetails = ({ orderId }) => {
  return (
    <div className={classNames(style['order-details'])}>
      <h2 className={classNames(style['order-details'], 'text', 'text_type_digits-large')}>
        {orderId}
      </h2>
      <div className={classNames('text','text_type_digits-default')}>
        идентификатор заказа
      </div>
      <img src="order_ready" alt="Here will be an something" />
      <h3 className={classNames('text','text_type_digits-small')}>
        Ваш заказ начали готовить
      </h3>
      <h3 className={classNames('text','text_type_main-default')}>
        Дождитесь готовности на орбитальной станции
      </h3>
    </div>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired
};
export default OrderDetails;