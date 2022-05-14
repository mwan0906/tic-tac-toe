import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import axios from 'axios';

const initialState = {
    board: [['','',''], ['','',''], ['','','']],
    loading: false,
    loggedIn: false
}

// set these to constants instead of purely strings to keep consistency easier
const PLAYER_SET = 'PLAYER_SET';
const AI_SET = 'AI_SET';
const RESET = 'RESET';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT'

const aiSet = board => ({
  type: AI_SET,
  board
});

const playerSet = coords => ({
  type: PLAYER_SET,
  coords
});

export const reset = () => ({
  type: RESET
});

export const login = () => ({
  type: LOGIN
})

export const logout = () => ({
  type: LOGOUT
})

const reducer = (state = initialState, action) => {
  let newBoard;
  switch (action.type) {
    case PLAYER_SET:
      newBoard = [[...state.board[0]], [...state.board[1]], [...state.board[2]]]
      newBoard[action.coords[0]][action.coords[1]] = 'X';
      return {...state, board: newBoard, loading: true};
    case AI_SET:
      newBoard = action.board;
      return {...state, board: newBoard, loading: false};
    case RESET:
      return {...state, board: initialState.board};
    case LOGIN:
      return {...state, loggedIn: true};
    case LOGOUT:
      window.sessionStorage.clear();
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
  axios.post(
    'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/engine',
    { board },
    { headers: { authorization: 'bearer ' + window.sessionStorage.getItem('token') } }
  )
  .then(({data}) => {
    console.log(data);
    if (data.success) dispatch(aiSet(data.board))
    else dispatch(aiSet(board))
  });
};

// Could directly export the playerSet function, but want to be consistent
export const getPlayer = (coords) => (dispatch, getState) => {
  dispatch(playerSet(coords));
}