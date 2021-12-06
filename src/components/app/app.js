import React, { useEffect } from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import DisplayError from "../display-error/display-error";
import DisplayWaiting from "../display-waiting/display-waiting";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {useDispatch, useSelector} from "react-redux";

import { RESET_CURRENT_INGREDIENT } from '../../services/actions/ingredient';
import { RESET_ERROR_MESSAGE } from '../../services/actions/error';
import { ERASE_ORDER } from '../../services/actions/order';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();
  const { selectedIngredient }  = useSelector(store => store.burgerIngredient);
  const { errorMessage }  = useSelector(store => store.errorInfo);
  const orderCreated = useSelector(store => store.orderIngredients.orderCreated);
  const isWaitingIngredients  = useSelector(store => store.burgerIngredients.isLoading);
  const isWaitingOrder = useSelector(store => store.orderIngredients.isLoading);
  const isWaiting = isWaitingIngredients || isWaitingOrder;

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const hideIngredientInfo = () => {
    dispatch({type: RESET_CURRENT_INGREDIENT})
  };

  const hideOrderInfo = () => {
    dispatch({type: ERASE_ORDER});
  };

  const hideDisplayError = () => {
    dispatch({type: RESET_ERROR_MESSAGE});
  };

  return (
    <div>
      <AppHeader />
      <div className={style.main_blocks}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
      </div>
      { selectedIngredient._id && (
      <Modal onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails />
      </Modal>
      )}
      { orderCreated && (
      <Modal onClose={hideOrderInfo} className={style['order-modal']}>
        <OrderDetails />
      </Modal>
      )}
      { errorMessage && (
      <Modal onClose={hideDisplayError} className={style['error-modal']}>
        <DisplayError />
      </Modal>
      )}
      { isWaiting && (
          <Modal className={style['error-modal']}>
            <DisplayWaiting />
          </Modal>
      )}
    </div>
  );
}

export default App;
