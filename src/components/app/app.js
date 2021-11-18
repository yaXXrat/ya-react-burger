import React, { useState, useEffect } from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredient-details/burger-ingredient-details';
import OrderDetails from '../order-details/order-details';
import DisplayError from "../display-error/display-error";
const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [data, setData] = useState([]);

  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isDisplayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [selectedIngredient, setSelectedIngredient] = useState({
    name: '',
    image_large: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
  });
  
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
    setIngredientDetailsOpen(true);
    setSelectedIngredient(ingredient);
  };
  const hideIngredientInfo = () => {
    setIngredientDetailsOpen(false);
  };

  const displayOrderInfo = () => {
    setOrderDetailsOpen(true);
  };
  const hideOrderInfo = () => {
    setOrderDetailsOpen(false);
  };

  const hideDisplayError = () =>{
    setDisplayErrorOpen('')
  };

  return (
    <div>
      <AppHeader />
      <div className={style.main_blocks}>
        <BurgerIngredients ingredientsData={data} displayIngredientInfo={displayIngredientInfo}/>
        <BurgerConstructor ingredientsData={data} displayOrderInfo={displayOrderInfo} />
      </div>
      <Modal isOpen={isIngredientDetailsOpen} onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
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
