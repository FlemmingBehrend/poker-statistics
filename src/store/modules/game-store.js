import {GAMES_FETCH} from "../actions";
import jmespath from "jmespath";

const state = {
    games: []
};

const getters = {
    attendingRate() {
        const expression = "games[*].AttendingPlayerIds[]";
        const search = jmespath.search(state, expression);
        return search.reduce((acc, cur) => {
            if (typeof acc[cur] === "undefined") {
                acc[cur] = 1;
            } else {
                acc[cur] += 1;
            }
            return acc;
        }, {});
    }
};

const mutations = {
    [GAMES_FETCH](state, games) {
        state.games = games;
    }
};
const actions = {
    [GAMES_FETCH]({commit}) {
        return new Promise(resolve => {
            fetch("./static/games.json")
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    commit(GAMES_FETCH, json);
                });
            resolve();
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
