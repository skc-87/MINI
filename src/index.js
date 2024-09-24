import React from 'react';
import ReactDOM from 'react-dom'; // Correct import statement for ReactDOM
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Correct import statement for BrowserRouter
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} > {/* Added StrictMode */}
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
