import {FILTER_UPDATE} from "../actions";

const state = {
    filter: {
        date: true,
        season: false,
        pokernight: false
    }
};

const getters = {
    filterOn(state) {
        if (state.filter.date) {
            return 'date';
        }
        if (state.filter.season) {
            return 'season';
        }
        if (state.filter.pokernight) {
            return 'pokernight'
        }
    },
    filterOnDate(state) {
        return state.filter.date;
    },
    filterOnSeason(state) {
        return state.filter.season;
    },
    filterOnPokernight(state) {
        return state.filter.pokernight;
    }
};

const mutations = {
    setFilterValue(state, payload) {
        for (const key in state.filter) {
            if (state.filter.hasOwnProperty(key)) {
                state.filter[key] = key === payload;
            }
        }
    }
};

const actions = {
    [FILTER_UPDATE]({commit}, payload) {
        return new Promise(resolve => {
            commit('setFilterValue', payload);
            resolve();
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
