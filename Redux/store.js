import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'\
import { composeWithDevTools } from '@redux-devtools/extension';

import cartItems from './Reducers/cartItem'
import commentItems from './Reducers/CommentItem';
import authReducer from './Reducers/authReducer';

const reducers = combineReducers({
    cartItems: cartItems,
    commentItems: commentItems,
    authReducer: authReducer
})

const store = createStore(
    reducers
    //composeWithDevTools(applyMiddleware(thunkMiddleware))
    //composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;