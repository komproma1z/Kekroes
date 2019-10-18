import { ADD_HERO, SELECT_HERO } from './actions';


const initialState = {
    heroes: [],
    selectedHero: null,
};

export const heroesReducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_HERO:
            return {...state, heroes: [...state.heroes, action.payload.hero]};
        case SELECT_HERO:
            return {...state, selectedHero: action.payload.hero};
        default:
            return state;
    }
} 