import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { heroesReducer } from '../store/heroesStore';

export default history =>
    combineReducers({
        router: connectRouter(history),
        heroesReducer,
    });
