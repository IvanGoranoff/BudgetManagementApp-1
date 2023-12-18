import { combineReducers } from 'redux';

// Съществуващите reducers
import customizationReducer from './customizationReducer';
import userReducer from './UserReducer'
// Комбиниране на reducers
const reducer = combineReducers({
  customization: customizationReducer,
  user: userReducer
});

export default reducer;
