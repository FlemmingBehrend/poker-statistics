import {FILTER_DATE_RESET, FILTER_DATE_SET, FILTER_DATE_SET_FROM, FILTER_DATE_SET_TO, FILTER_UPDATE} from "../actions";
import {ATTENDANCE_CHART, CARD_ERRORS_CHART, FINALS_CHART, MONEY_WON_CHART} from "../graph-types";

const defaultStartDate = "2000-01-01";
const defaultEndDate = "2050-01-01";

const state = {
    filter: {
        by: {
            date: true,
            season: false,
            pokernight: false,
        },
        dates: {
            [ATTENDANCE_CHART]: {
                from: defaultStartDate,
                to: defaultEndDate
            },
            [FINALS_CHART]: {
                from: defaultStartDate,
                to: defaultEndDate
            },
            [MONEY_WON_CHART]: {
                from: defaultStartDate,
                to: defaultEndDate
            },
            [CARD_ERRORS_CHART]: {
                from: defaultStartDate,
                to: defaultEndDate
            }
        }
    }
};

const getters = {
    filterOn: state => {
        if (state.filter.by.date) {
            return 'date';
        }
        if (state.filter.by.season) {
            return 'season';
        }
        if (state.filter.by.pokernight) {
            return 'pokernight'
        }
    },
    filterOnDate: state => {
        return state.filter.by.date;
    },
    filterOnSeason: state => {
        return state.filter.by.season;
    },
    filterOnPokernight: state => {
        return state.filter.by.pokernight;
    },
    filterFromDate: state => graphType => {
        return state.filter.dates[graphType].from;
    },
    filterToDate: state => graphType => {
        return state.filter.dates[graphType].to;
    }
};

const mutations = {
    setFilterValue(state, payload) {
        for (const key in state.filter.by) {
            if (state.filter.by.hasOwnProperty(key)) {
                state.filter.by[key] = key === payload;
            }
        }
    },
    resetFilterDates(state) {
        state.filter.dates[ATTENDANCE_CHART].from = defaultStartDate;
        state.filter.dates[ATTENDANCE_CHART].to = defaultEndDate;
        state.filter.dates[CARD_ERRORS_CHART].from = defaultStartDate;
        state.filter.dates[CARD_ERRORS_CHART].to = defaultEndDate;
        state.filter.dates[FINALS_CHART].from = defaultStartDate;
        state.filter.dates[FINALS_CHART].to = defaultEndDate;
        state.filter.dates[MONEY_WON_CHART].from = defaultStartDate;
        state.filter.dates[MONEY_WON_CHART].to = defaultEndDate;
    },
    setFilterDateFrom(state, payload) {
        state.filter.dates[payload.graphType].from = payload.fromDate;
    },
    setFilterDateTo(state, payload) {
        state.filter.dates[payload.graphType].to = payload.toDate;
    }
};

const actions = {
    [FILTER_UPDATE]({commit}, payload) {
        return new Promise(resolve => {
            commit('setFilterValue', payload);
            resolve();
        });
    },
    [FILTER_DATE_RESET]({commit}) {
        return new Promise(resolve => {
            commit('resetFilterDates');
            resolve();
        });
    },
    [FILTER_DATE_SET_FROM]({commit}, payload) {
        return new Promise(resolve => {
            commit('setFilterDateFrom', payload);
            resolve();
        });
    },
    [FILTER_DATE_SET_TO]({commit}, payload) {
        return new Promise(resolve => {
            commit('setFilterDateTo', payload);
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
