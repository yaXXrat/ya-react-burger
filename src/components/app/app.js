import React, { useState } from 'react';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredient-details/burger-ingredient-details';

function App() {
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState({});
  
  const displayIngredientInfo = (ingredient) => {
    setIngredientDetailsOpen(true);
    setSelectedIngredient(ingredient);
  };
  const hideIngredientInfo = () => {
    setIngredientDetailsOpen(false);
  };
  return (
    <div>
      <AppHeader />
      <div className={style.main_blocks}>
        <BurgerIngredients displayIngredientInfo={displayIngredientInfo}/>
        <BurgerConstructor />
      </div>
      <Modal isOpen={isIngredientDetailsOpen} onClose={hideIngredientInfo}>
        <IngredientDetails
          ingredient={selectedIngredient}
        />
      </Modal>
    </div>
  );
}

export default App;
