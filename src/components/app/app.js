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

import {
  LOAD_INGREDIENTS_REQUEST,
  LOAD_INGREDIENTS_SUCCESS,
  LOAD_INGREDIENTS_ERROR,
  RESET_CURRENT_INGREDIENT,
} from '../../services/actions/ingredients';
import { SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from '../../services/actions/error';
import { ERASE_ORDER, SET_ORDER_INGREDIENT } from '../../services/actions/order';

const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const dispatch = useDispatch();
  const { ingredientSelected }  = useSelector(store => store.burgerIngredients);
  const { isError }  = useSelector(store => store.errorInfo);
  const orderCreated = useSelector(store => store.orderIngredients.orderCreated);
  const isWaiting  = useSelector(store => store.burgerIngredients.isLoading);

  useEffect(() => {

    const selectIngredients = (allIngredients) => {
      if (allIngredients.length === 0) return [];

      allIngredients.forEach((obj, i) => {
        allIngredients[i].count = 1;
      });

      const burgerIngredients = getBurgerIngredients(getIngredients(allIngredients));
      const burgerBun = getBurgerBun(getBun(allIngredients));
      burgerBun.count = 1;
      const result = [];
      burgerIngredients.forEach((item) => {
        item._id in result ? result[item._id]++ : result[item._id] = 1;
      });
      dispatch({type: SET_ORDER_INGREDIENT, ingredient: burgerBun})
      burgerIngredients.forEach((item, i) => {
        burgerIngredients[i].count = result[item._id];
        dispatch({type: SET_ORDER_INGREDIENT, ingredient: burgerIngredients[i]})
      });
    }

    const getBurgerIngredients = (allIngredients) => {
      let randomCount = randomNumber(1, allIngredients.length - 1);
      const result = [];
      while (randomCount--) {
        const randomIndex = randomNumber(0, allIngredients.length - 1);
        result.push(allIngredients[randomIndex]);
      }
      return result;
    }

    const getBurgerBun = (allIngredients) => {
      const randomIndex = randomNumber(0, allIngredients.length - 1);
      return allIngredients[randomIndex];
    }

    dispatch({type: LOAD_INGREDIENTS_REQUEST});
    setTimeout(() => {
      fetch(url).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error happened during fetching!");
        }
      })
          .then((results) => {
            dispatch({type: LOAD_INGREDIENTS_SUCCESS, ingredients: results.data});
            selectIngredients(results.data);
          })
          .catch((e) => {
            dispatch({type: LOAD_INGREDIENTS_ERROR, errorMessage: e});
            dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name + ': ' + e.message});
          });
  }, 1000);
  }, [dispatch]);
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getIngredients = (allIngredients) => {
    return allIngredients.filter(ingredient => ingredient.type !== 'bun');
  }

  const getBun = (allIngredients) => {
    return allIngredients.filter(ingredient => ingredient.type === 'bun');
  }

  const hideIngredientInfo = () => {
    dispatch({type: RESET_CURRENT_INGREDIENT})
  };

  const hideOrderInfo = () => {
    dispatch({type: ERASE_ORDER});
  };

  const hideDisplayError = () =>{
    dispatch({type: RESET_ERROR_MESSAGE});
  };

  const hideDisplayWaiting = () =>{
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
      { ingredientSelected && (
      <Modal onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails />
      </Modal>
      )}
      { orderCreated && (
      <Modal onClose={hideOrderInfo} className={style['order-modal']}>
        <OrderDetails />
      </Modal>
      )}
      { isError && (
      <Modal onClose={hideDisplayError} className={style['error-modal']}>
        <DisplayError />
      </Modal>
      )}
      { isWaiting && (
          <Modal onClose={hideDisplayWaiting} className={style['error-modal']}>
            <DisplayWaiting />
          </Modal>
      )}
    </div>
  );
}

export default App;
