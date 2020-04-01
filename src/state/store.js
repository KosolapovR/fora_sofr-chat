import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import {default as chat} from './chat';

export function configureStore() {
    const rootReducer = combineReducers({chat, form: formReducer});
    return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}