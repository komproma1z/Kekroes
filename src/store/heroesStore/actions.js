export const ADD_HERO = 'ADD_HERO';
export const SELECT_HERO = 'SELECT_HERO';

export const addHero = hero => ({
    type: ADD_HERO,
    payload: {
        hero,
    }
});

export const selectHero = hero => ({
    type: SELECT_HERO,
    payload: {
        hero,
    }
});
