import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import axios from 'axios';

const initialState = {
    board: [['','',''], ['','',''], ['','','']],
    loading: false,
    loggedIn: false,
    victor: ''
}

// set these to constants instead of purely strings to keep consistency easier
const PLAYER_SET = 'PLAYER_SET';
const AI_SET = 'AI_SET';
const RESET = 'RESET';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOAD = 'LOAD';
const UNLOAD = 'UNLOAD';
const WIN = 'WIN';

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

export const load = () => ({
  type: LOAD
});

export const unload = () => ({
  type: UNLOAD
});

export const win = (victor) => ({
  type: WIN,
  victor
})

const reducer = (state = initialState, action) => {
  let newBoard;
  switch (action.type) {
    case PLAYER_SET:
      newBoard = [[...state.board[0]], [...state.board[1]], [...state.board[2]]]
      newBoard[action.coords[0]][action.coords[1]] = 'X';
      return {...state, board: newBoard};
    case AI_SET:
      newBoard = action.board;
      return {...state, board: newBoard};
    case RESET:
      return {...state, board: initialState.board, victory: ''};
    case LOGIN:
      return {...state, loggedIn: true};
    case LOGOUT:
      window.sessionStorage.clear();
      return initialState;
    case LOAD:
      return {...state, loading: true};
    case UNLOAD:
      return {...state, loading: false};
    case WIN:
      return {...state, victor: action.victor};
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunk, createLogger({ collapsed: true }));

const store = createStore(reducer, middleware);

export default store;

export const getAi = () => async (dispatch, getState) => {
  const { board } = getState();
  dispatch(load());

  return axios.post(
    'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/engine',
    { board },
    { headers: { authorization: 'bearer ' + window.sessionStorage.getItem('token') } }
  )
  .then(({data}) => {
    let newBoard = board;
    if (data.success) newBoard = data.board;
    dispatch(aiSet(newBoard));
    dispatch(unload());
    return newBoard;
  })
};

// Could directly export the playerSet function, but want to be consistent
export const getPlayer = (coords) => (dispatch, getState) => {
  dispatch(playerSet(coords));
  return getState().board;
}