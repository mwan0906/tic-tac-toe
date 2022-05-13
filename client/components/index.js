import React from 'react';
import Board from './board';
import { Provider } from 'react-redux'
import store from '../store';

export default () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  )
}