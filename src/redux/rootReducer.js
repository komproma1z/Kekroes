import { combineReducers } from 'redux';
import { heroesReducer } from '../store/heroesStore';

export default () => combineReducers({
    heroesReducer,
});
