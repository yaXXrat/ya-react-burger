import React, { useState, useEffect } from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import DisplayError from "../display-error/display-error";
const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [data, setData] = useState([]);

  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isDisplayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  
  useEffect(() => {
    fetch(url).then((res) => {
      if (res.ok) {    
        return res.json();  
      } else {
        throw new Error();  
      }
    })
    .then((results) => {
      setData(results.data);
    })
    .catch((e) => {
      setErrorText(e.name + ': ' + e.message);
      setDisplayErrorOpen( true);
      console.log("Error happened during fetching!", e);
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
        <BurgerIngredients ingredientsData={data} displayIngredientInfo={displayIngredientInfo}/>
        <BurgerConstructor ingredientsData={data} displayOrderInfo={displayOrderInfo} />
      </div>
      { selectedIngredient && (
      <Modal isOpen={selectedIngredient === null ? false : true} onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      )}
      <Modal isOpen={isOrderDetailsOpen} onClose={hideOrderInfo} className={style['order-modal']}>
        <OrderDetails orderId={34536} />
      </Modal>
      <Modal isOpen={isDisplayErrorOpen} onClose={hideDisplayError} className={style['error-modal']}>
        <DisplayError error={errorText} />
      </Modal>
    </div>
  );
}

export default App;
