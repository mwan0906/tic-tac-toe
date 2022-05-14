import React from 'react';
import App from './app';
import { Provider } from 'react-redux'
import store from '../store';

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}