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


const url = `https://norma.nomoreparties.space/api/ingredients`;

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isDisplayErrorOpen, setDisplayErrorOpen] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [order, setOrder] = useState({
    number: 0,
    success: true,
    name: "",
    ingredients: [],
    amount: 0,
    date: undefined
  });


  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {

    const selectIngredients = (data) => {
      let dataCounted = data;
      data.forEach(function(obj, i) {
        obj.count = 1;
        dataCounted[i] = obj;
      });
      let burgerIngredients = [];
      let burgerBun = {};
      if (data.length > 0){
        burgerIngredients = getBurgerIngredients(getIngredients(dataCounted));
        burgerBun = getBurgerBun(getBun(dataCounted));
        burgerBun.count = 1;
        let result=[];
        burgerIngredients.forEach((item) => {
          item._id in result ? result[item._id]++ : result[item._id] = 1;
        });
        burgerIngredients.forEach((item, i ) => {
          burgerIngredients[i].count = result[item._id];
        });
      }
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
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error happened during fetching!");
      }
    })
    .then((results) => {
      setIngredients(results.data);
      selectIngredients(results.data);
    })
    .catch((e) => {
      setErrorText(e.name + ': ' + e.message);
      setDisplayErrorOpen( true);
      console.log(e);
    });
  }, []);

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

  const createOrder = (createdOrder) => {
    console.log(createdOrder)
    setOrder(createdOrder);
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
                createOrder={createOrder} 
                setErrorText={setErrorText} 
                setDisplayErrorOpen={setDisplayErrorOpen} 
            />
          </SelectedDataContext.Provider>
        </IngredientsDataContext.Provider>
      </div>
      { selectedIngredient && (
      <Modal onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
      )}
      { isOrderDetailsOpen && (
      <Modal onClose={hideOrderInfo} className={style['order-modal']}>
        <OrderDetails orderId={order.number} />
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