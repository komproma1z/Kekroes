import { ADD_HERO, SELECT_HERO } from './actions';

const initialState = {
    heroes: [
        {name: 'Bensalio', race: 'Ogre', hp: 70, stats: {attack: 9, defense: 7, spellPower: 3, knowledge: 2}},
        {name: 'Linus', race: 'Orion', hp: 70, stats: {attack: 5, defense: 6, spellPower: 6, knowledge: 4}},
        {name: 'Shoshuarde', race: 'Giblin', hp: 120, stats: {attack: 4, defense: 4, spellPower: 4, knowledge: 3}},
    ],
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
};
