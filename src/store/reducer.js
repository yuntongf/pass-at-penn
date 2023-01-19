import {combineReducers} from 'redux';
import entitiesReducer from './reducers/courses';
import searchReducer from './reducers/search';
import navReducer from './reducers/nav';

export default combineReducers({
    search: searchReducer,
    entities: entitiesReducer,
    nav:navReducer
});