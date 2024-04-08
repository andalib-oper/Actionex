import rootReducer from './rootReducer'; // Assuming 'rootReducer.tsx' is exporting the necessary module
import { createStore, applyMiddleware, Reducer } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

const store = createStore(rootReducer as unknown as Reducer<Partial<{ authState: never; }>, AuthAction, Partial<{ authState: never; }>>, applyMiddleware(thunk as ThunkMiddleware<Partial<{ authState: never; }>, AuthAction>));

export default store;
