import React, { useState, useEffect } from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredient-details/burger-ingredient-details';
import OrderDetails from '../order-details/order-details';
const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [data, setData] = useState([]);

  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState({
    name: '',
    image_large: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
  });
  
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        console.log("Error happened during fetching!", err);
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

  return (
    <div>
      <AppHeader />
      <div className={style.main_blocks}>
        <BurgerIngredients ingredientsData={data} displayIngredientInfo={displayIngredientInfo}/>
        <BurgerConstructor ingredientsData={data} displayOrderInfo={displayOrderInfo} />
      </div>
      <Modal isOpen={isIngredientDetailsOpen} onClose={hideIngredientInfo} modalClass={'ingredient-modal'}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      <Modal isOpen={isOrderDetailsOpen} onClose={hideOrderInfo} modalClass={'order-modal'}>
        <OrderDetails orderId={34536} />
      </Modal>
    </div>
  );
}

export default App;
