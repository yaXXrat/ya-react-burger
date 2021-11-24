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


const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [ingredients, setIngredients] = useState([]);

  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isDisplayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  
  useEffect(() => {
    fetch(url).then((res) => {
      if (res.ok) {    
        return res.json();  
      } else {
        throw new Error("Error happened during fetching!");
      }
    })
    .then((results) => {
      setIngredients(results.data);
    })
    .catch((e) => {
      setErrorText(e.name + ': ' + e.message);
      setDisplayErrorOpen( true);
      console.log(e);
    });
  }, []);

  const displayIngredientInfo = (ingredient) => {
    setSelectedIngredient(ingredient);
  };
  const hideIngredientInfo = () => {
    setSelectedIngredient(null)
  };

  const displayOrderInfo = () => {
    setOrderDetailsOpen(true);
  };
  const hideOrderInfo = () => {
    setOrderDetailsOpen(false);
  };

  const hideDisplayError = () =>{
    setDisplayErrorOpen(false);
  };

  return (
    <div>
      <AppHeader />
      <div className={style.main_blocks}>
        <IngredientsDataContext.Provider value={ingredients} >
          <BurgerIngredients displayIngredientInfo={displayIngredientInfo}/>
          <BurgerConstructor displayOrderInfo={displayOrderInfo} />
        </IngredientsDataContext.Provider>
      </div>
      { selectedIngredient && (
      <Modal onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      )}
      { isOrderDetailsOpen && (
      <Modal onClose={hideOrderInfo} className={style['order-modal']}>
        <OrderDetails orderId={34536} />
      </Modal>
      )}
      { isDisplayErrorOpen && (
      <Modal onClose={hideDisplayError} className={style['error-modal']}>
        <DisplayError error={errorText} />
      </Modal>
      )}
    </div>
  );
}

export default App;
