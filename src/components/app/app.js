import React from 'react';
import './style.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <div>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>    
    </div>
  );
}

export default App;