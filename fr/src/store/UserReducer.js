import * as actionTypes from './actions';

const initialState = {
  user: null, 
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    // Можете да добавите други случаи тук
    default:
      return state;
  }
};

export default userReducer;
