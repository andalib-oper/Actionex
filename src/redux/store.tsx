import rootReducer from './rootReducer'; // Assuming 'rootReducer.tsx' is exporting the necessary module
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer);

export default store;
