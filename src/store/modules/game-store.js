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

const defaultStartDate = "2000-01-01";
const defaultEndDate = "2050-01-01";

const getters = {
    numberOfPokernights: state => (from = defaultStartDate, to = defaultEndDate) => {
        return filterByDate(state.games, from, to).length;
    },
    games: state => (from = defaultStartDate, to = defaultEndDate) => {
        return filterByDate(state.games, from, to);
    },
    winnings: state => (from = defaultStartDate, to = defaultEndDate) => {
        const pokernights = filterByDate(state.games, from, to);
        const winnings = [];
        pokernights.forEach(pokernight => {
            const firstPrize = pokernight.Info.FirstPrize;
            const secondPrize = pokernight.Info.SecondPrize;
            pokernight.GamesPlayed.forEach(game => {
                const obj = {
                    game: {
                        win: {
                            id: game.WinnerPlayerId,
                            prize: firstPrize
                        },
                        second: {
                            id: game.SecondPlayerId,
                            prize: secondPrize
                        }
                    }
                };
                winnings.push(obj);
            })
        });
        return winnings;
    },
    cardErrors: state => (from = defaultStartDate, to = defaultEndDate) => {
        const pokernights = filterByDate(state.games, from, to);
        return jmespath.search(pokernights, "[*].Errors[]")
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
