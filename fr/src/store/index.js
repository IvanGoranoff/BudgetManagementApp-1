import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(
    reducer,
    applyMiddleware(thunk) // Apply Redux Thunk middleware
);

const persister = 'Home';

export { store, persister };
