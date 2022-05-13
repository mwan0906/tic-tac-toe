import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import axios from 'axios';

const initialState = {
    board: [['X','O','X'], ['','',''], ['','','']],
    loading: false
}

// set these to constants instead of purely strings to keep consistency easier
const PLAYER_SET = 'PLAYER_SET';
const AI_SET = 'AI_SET';
const RESET = 'RESET';

const aiSet = res => ({
  type: AI_SET,
  res
});

const playerSet = coords => ({
  type: PLAYER_SET,
  coords
});

const reset = () => ({
  type: RESET
});

const reducer = (state = initialState, action) => {
  let newBoard;
  switch (action.type) {
    case PLAYER_SET:
      newBoard = [[...state.board[0]], [...state.board[1]], [...state.board[2]]]
      newBoard[action.coords[0]][action.coords[1]] = 'X';
      return {board: newBoard, loading: true};
    case AI_SET:
      newBoard = action.res;
      return {board: newBoard, loading: false};
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunk, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;

export const getAi = () => async (dispatch, getState) => {
  const { board } = getState();
  const { data } = await axios.post(
    'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/',
    board
  ).then(({data}) => console.log(data));
  dispatch(aiSet(data));
};