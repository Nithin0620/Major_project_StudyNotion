import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import rootReducer from './reducer';
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import RouterConfig from './Router';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={RouterConfig()} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);