import React, { useState, useEffect } from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import DisplayError from "../display-error/display-error";

import { IngredientsDataContext } from '../../services/ingredients-data-context.js';
import { SelectedDataContext } from '../../services/selected-data-context.js';
import {useDispatch, useSelector} from "react-redux";

import {
  LOAD_INGREDIENTS,
  LOAD_INGREDIENTS_SUCCESS,
  LOAD_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  RESET_CURRENT_INGREDIENT,
  SET_ERROR_MESSAGE,
  RESET_ERROR_MESSAGE,
} from '../../services/actions/actions';
import { ERASE_ORDER, SET_ORDER_INGREDIENT } from '../../services/actions/orderActions';

const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const dispatch = useDispatch();
  const selectedIngredient = useSelector(store => store.burgerIngredients.selectedIngredient);
  const errorMessage = useSelector(store => store.burgerIngredients.errorMessage);

  useEffect(() => {

    const selectIngredients = (allIngredients) => {
      if(allIngredients.length === 0) return [];

      allIngredients.forEach( (obj, i) => {
        allIngredients[i].count = 1;
      });

      const burgerIngredients = getBurgerIngredients(getIngredients(allIngredients));
      const burgerBun = getBurgerBun(getBun(allIngredients));
      burgerBun.count = 1;
      const result=[];
      burgerIngredients.forEach((item) => {
        item._id in result ? result[item._id]++ : result[item._id] = 1;
      });
      dispatch({type: SET_ORDER_INGREDIENT, ingredient: burgerBun})
      burgerIngredients.forEach((item, i ) => {
        burgerIngredients[i].count = result[item._id];
        dispatch({type: SET_ORDER_INGREDIENT, ingredient: burgerIngredients[i]})
      });
      setSelectedIngredients([burgerBun, ...burgerIngredients]);
    }

    const getBurgerIngredients = (allIngredients) => {
      let randomCount = randomNumber(1, allIngredients.length - 1);
      const result = [];
      while (randomCount--){
        const randomIndex = randomNumber(0, allIngredients.length - 1);
        result.push(allIngredients[randomIndex]);
      }
      return result;
    }

    const getBurgerBun = (allIngredients) => {
      const randomIndex = randomNumber(0, allIngredients.length - 1);
      return allIngredients[randomIndex];
    }

    fetch(url).then((res) => {
      dispatch({type: LOAD_INGREDIENTS});
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error happened during fetching!");
      }
    })
    .then((results) =>
    {
      dispatch({type: LOAD_INGREDIENTS_SUCCESS, ingredients: results.data});
      setIngredients(results.data);
      selectIngredients(results.data);
    })
    .catch((e) => {
      dispatch({type: LOAD_INGREDIENTS_FAILED, errorMessage: e});
      dispatch({type: SET_ERROR_MESSAGE, errorMessage: e.name + ': ' + e.message});
      console.log(e);
    });
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

  const displayIngredientInfo = (ingredient) => {
    dispatch({type: SET_ORDER_INGREDIENT, ingredient: ingredient})
    dispatch({type: SET_CURRENT_INGREDIENT, id: ingredient._id})
  };
  const hideIngredientInfo = () => {
    dispatch({type: RESET_CURRENT_INGREDIENT})
  };

  const displayOrderInfo = () => {
    setOrderDetailsOpen(true);
  };
  const hideOrderInfo = () => {
    dispatch({type: ERASE_ORDER});
    setOrderDetailsOpen(false);
  };

  const hideDisplayError = () =>{
    dispatch({type: RESET_ERROR_MESSAGE});
  };

  return (
    <div>
      <AppHeader />
      <div className={style.main_blocks}>
        <IngredientsDataContext.Provider value={ingredients} >
          <SelectedDataContext.Provider value={selectedIngredients} >
            <BurgerIngredients displayIngredientInfo={displayIngredientInfo}/>
            <BurgerConstructor 
                displayOrderInfo={displayOrderInfo} 
            />
          </SelectedDataContext.Provider>
        </IngredientsDataContext.Provider>
      </div>
      { Object.keys(selectedIngredient).length > 0 && (
      <Modal onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      )}
      { isOrderDetailsOpen && (
      <Modal onClose={hideOrderInfo} className={style['order-modal']}>
        <OrderDetails />
      </Modal>
      )}
      { errorMessage && (
      <Modal onClose={hideDisplayError} className={style['error-modal']}>
        <DisplayError error={errorMessage} />
      </Modal>
      )}
    </div>
  );
}

export default App;
