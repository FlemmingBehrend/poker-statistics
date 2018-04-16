import {GAMES_FETCH} from "../actions";

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

const defaultStartDate = "2000-01-01";
const defaultEndDate = "2050-01-01";

const getters = {
    getNumberOfPokernights: state => (from = defaultStartDate, to = defaultEndDate) => {
        return filterByDate(state.games, from, to).length;
    },
    getGames: state => (from = defaultStartDate, to = defaultEndDate) => {
        return filterByDate(state.games, from, to);
    },
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
