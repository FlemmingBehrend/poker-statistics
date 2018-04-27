import { PLAYERS_FETCH } from "../actions";
import jmespath from "jmespath";

const state = {
    players: []
};

const getters = {
    players: state => {
        return state.players;
    },
    playerIds: state => {
        const ids = [];
        for (let i=1; i<state.players.length+1; i++) {
            ids.push(i);
        }
        return ids;
    },
    numberOfPlayers: state => {
        return state.players.length;
    },
    playerName: state => id => {
        const expression = "players[?id == `" + id + "`].name.first";
        return jmespath.search(state, expression)[0];
    }
};

const mutations = {
    setPlayers(state, players) {
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
                    commit('setPlayers', json.players);
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
