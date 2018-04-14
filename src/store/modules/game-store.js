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

function groupIds(idArray) {
    return idArray.reduce((acc, cur) => {
        if (typeof acc[cur] === "undefined") {
            acc[cur] = 1;
        } else {
            acc[cur] += 1;
        }
        return acc;
    }, {});
}

const state = {
    games: []
};

const defaultStartDate = "2000-01-01";
const defaultEndDate = "2050-01-01";

const getters = {
    countPokernights: state => (from = defaultStartDate, to = defaultEndDate) => {
        return filterByDate(state.games, from, to).length;
    },
    attendingRate: state => (from = defaultStartDate, to = defaultEndDate) => {
        return groupIds(jmespath.search(filterByDate(state.games, from, to), "[*].AttendingPlayerIds[]"));
    },
    finalists: (state, getters) => (from = defaultStartDate, to = defaultEndDate) => {
        const zeroBasedWinnerObj = {};
        const zeroBasedRunnersUpObj = {};
        for (let i=1; i<getters.numberOfPlayers+1; i++) {
            zeroBasedWinnerObj[i] = 0;
            zeroBasedRunnersUpObj[i] = 0;
        }
        const games = filterByDate(state.games, from, to);
        const winsById = {} = groupIds(jmespath.search(games, "[*].GamesPlayed[*][].WinnerPlayerId"));
        const winners = Object.assign(zeroBasedWinnerObj, winsById);
        const runsById = groupIds(jmespath.search(games, "[*].GamesPlayed[*][].SecondPlayerId"));
        const runnersUp = Object.assign(zeroBasedRunnersUpObj, runsById);
        return {winners: winners, runnersUp: runnersUp};
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
