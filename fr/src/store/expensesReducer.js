

const expensesReducer = (state = { expenses: [], error: null }, action) => {
  switch (action.type) {
    case 'FETCH_EXPENSES_SUCCESS':
      return {
        ...state,
        expenses: action.payload
      };
    case 'FETCH_EXPENSES_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
    case 'FETCH_INCOME_SUCCESS':
      return {
        ...state,
        income: action.payload
      };
    case 'FETCH_INCOME_ERROR':
      return {
        ...state,
        error: action.payload // You may want separate error fields for income and expenses
      };

    // ... existing code ...

  }
};

export default expensesReducer;
