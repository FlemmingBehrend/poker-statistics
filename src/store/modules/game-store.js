import { GAMES_FETCH } from "../actions";
import jmespath from "jmespath";

const state = {
    games: []
};

const getters = {
    attendingRate(state) {
        return playerId => {
            const expression = "games[*].AttendingPlayerIds[]";
            const search = jmespath.search(state, expression);
            console.log("attendingRate > jmespath: ", search);

            const rates = search
                .filter(v => v === playerId)
                .length
            ;
            console.log("rates", rates);
            return rates;
        }
    }};

const mutations = {
    [GAMES_FETCH](state, games) {
        state.games = games;
    }
};
const actions = {
    [GAMES_FETCH]({ commit }) {
        fetch("./static/games.json")
            .then(response => {
                return response.json();
            })
            .then(json => {
                commit(GAMES_FETCH, json);
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
