// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

// actions.js
export const fetchExpenses = () => async (dispatch) => {
    try {
        const response = await axios.get('https://localhost:7069/api/Expenses/1');
        dispatch({
            type: 'FETCH_EXPENSES_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_EXPENSES_ERROR',
            payload: error
        });
    }
};
// Fetch income action
export const fetchIncome = () => async (dispatch) => {
    try {
        const response = await axios.get('https://localhost:7069/api/Income/1');
        dispatch({
            type: 'FETCH_INCOME_SUCCESS',
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_INCOME_ERROR',
            payload: error
        });
    }
};
