import { PLAYERS_FETCH } from "../actions";
import jmespath from "jmespath";

const state = {
    players: []
};

const getters = {
    players(state) {
        return state.players;
    },
    numberOfPlayers(state) {
        return state.players.length;
    },
    playerName: state => id => {
        const expression = "players[?id == `" + id + "`].name.first";
        return jmespath.search(state, expression);
    }
};

const mutations = {
    [PLAYERS_FETCH](state, players) {
        state.players = players;
    }
};

const actions = {
    [PLAYERS_FETCH]({ commit }) {
        return new Promise(resolve => {
            fetch("./static/players.json")
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    commit(PLAYERS_FETCH, json.players);
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
