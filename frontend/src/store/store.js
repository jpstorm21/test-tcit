import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const configureStore = () => {
    const store = createStore(
        combineReducers({
            ...reducers,
        }),
        compose(
            applyMiddleware(thunk),
            typeof window === 'object' &&
                typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : (f) => f
        )
    );
    return store;
};

export default configureStore;
