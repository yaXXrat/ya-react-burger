import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/';

import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore( rootReducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

