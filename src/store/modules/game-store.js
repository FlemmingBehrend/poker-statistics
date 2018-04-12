import {GAMES_FETCH} from "../actions";
import jmespath from "jmespath";

function convertDate(str) {
    const [year, month, day] = str.split("-");
    return new Date(`${year}-${month}-${day}`);
}

function filterByDate(games, from, to) {
    const fromDate = convertDate(from);
    const toDate = convertDate(to);
    return games.filter(game => {
        const date = new Date(game.Info.Date);
        if (fromDate.getTime() <= date.getTime() && toDate.getTime() >= date.getTime()) {
            return game;
        }
    });
}

const state = {
    games: []
};

const getters = {
    countPokernights: state => (from = "2000-01-01", to = "2050-01-01") => {
        return filterByDate(state.games, from, to).length;
    },
    attendingRate: state => (from = "2000-01-01", to = "2050-01-01") => {
        const expression = "[*].AttendingPlayerIds[]";
        const search = jmespath.search(filterByDate(state.games, from, to), expression);
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
