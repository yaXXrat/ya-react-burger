import React, { useEffect } from 'react';
import style from './shared.module.css'

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import OrderDetails from '../components/order-details/order-details';
import DisplayError from "../components/display-error/display-error";
import DisplayWaiting from "../components/display-waiting/display-waiting";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {useDispatch, useSelector} from "react-redux";

import { RESET_CURRENT_INGREDIENT } from '../services/actions/ingredient';
import { RESET_ERROR_MESSAGE } from '../services/actions/error';
import { ERASE_ORDER } from '../services/actions/order';
import { ERASE_INGREDIENTS_ORDER } from '../services/actions/constructor';
import { getIngredients } from '../services/actions/ingredients';

function MainPage() {
    const dispatch = useDispatch();
    const { selectedIngredient }  = useSelector(store => store.burgerIngredient);
    const { errorMessage }  = useSelector(store => store.errorInfo);
    const orderCreated = useSelector(store => store.order.orderCreated);
    const isWaitingIngredients  = useSelector(store => store.burgerIngredients.isLoading);
    const isWaitingOrder = useSelector(store => store.order.isLoading);
    const isWaiting = isWaitingIngredients || isWaitingOrder;
  
    const { isLogged, user } = useSelector(store => store.auth);

    if(isLogged){
      console.log('User: ',JSON.stringify(user));
    }else{
      console.log('No logged user');
    }

    useEffect(() => {
      dispatch(getIngredients())
    }, [dispatch]);
  
    const hideIngredientInfo = () => {
      dispatch({type: RESET_CURRENT_INGREDIENT})
    };
  
    const hideOrderInfo = () => {
      dispatch({type: ERASE_ORDER});
      dispatch({type: ERASE_INGREDIENTS_ORDER});
    };
  
    const hideDisplayError = () => {
      dispatch({type: RESET_ERROR_MESSAGE});
    };
      return (
    <div>
      <div className={style.main_blocks}>
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
      </div>
      { selectedIngredient && (
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
    )
}

export default MainPage;