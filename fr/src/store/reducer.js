
import { combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import expensesReducer from './expensesReducer'; // Import the new reducer

const rootReducer = combineReducers({
  customization: customizationReducer,
  expenses: expensesReducer // Combine the new reducer
});

export default rootReducer;
