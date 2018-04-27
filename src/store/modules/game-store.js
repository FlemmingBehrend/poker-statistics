import {GAMES_FETCH} from "../actions";
import jmespath from "jmespath";
import moment from "moment";
moment.locale('da');

function filterByDate(games, from, to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
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
    numberOfPokernights: (state, getters) => graphType => {
        const from = getters.filterFromDate(graphType);
        const to = getters.filterToDate(graphType);
        return filterByDate(state.games, from, to).length;
    },
    games: (state, getters) => graphType =>{
        if (!graphType) return state.games;
        const from = getters.filterFromDate(graphType);
        const to = getters.filterToDate(graphType);
        return filterByDate(state.games, from, to);
    },
    wins: state => (player, opponent) => {
        return jmespath.search(state.games, 'length([*].GamesPlayed[?WinnerPlayerId==`4`][]|[?SecondPlayerId==`2`])');
    },
    winnings: (state, getters) => graphType => {
        const from = getters.filterFromDate(graphType);
        const to = getters.filterToDate(graphType);
        const pokernights = filterByDate(state.games, from, to);
        const winnings = [];
        pokernights.forEach(pokernight => {
            const firstPrize = pokernight.Info.FirstPrize;
            const secondPrize = pokernight.Info.SecondPrize;
            const attendingPlayerIds = pokernight.AttendingPlayerIds;

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
                        },
                        attendingPlayerIds: attendingPlayerIds
                    }
                };
                winnings.push(obj);
            })
        });
        return winnings;
    },
    cardErrors: (state, getters) => graphType => {
        const from = getters.filterFromDate(graphType);
        const to = getters.filterToDate(graphType);
        const pokernights = filterByDate(state.games, from, to);
        return jmespath.search(pokernights, "[*].Errors[]")
    },
    pokernightDates: state => {
        const pokerDates = jmespath.search(state.games, '[*].Info.Date|sort(@)|reverse(@)');
        return pokerDates.map(date => {
            const m = moment(date);
            return {date: date, renderDate: m.format('ll'), renderFromNow: m.fromNow()};
        });
    },
    seasonDates: state => {
        const seasons = jmespath.search(state.games, '[*].{Season: Season, Date: Info.Date}');
        const seasonsDates = [];
        const datesInSeasons = seasons.reduce((acc, cur) => {
            if (acc.hasOwnProperty(cur.Season)) {
                acc[cur.Season].push(moment(cur.Date));
            } else {
                acc[cur.Season] = [];
                acc[cur.Season].push(moment(cur.Date));
            }
            return acc;
        }, {});
        for (const key in datesInSeasons) {
            if (datesInSeasons.hasOwnProperty(key)) {
                const minDate = Math.min(...datesInSeasons[key]);
                const maxDate = Math.max(...datesInSeasons[key]);
                seasonsDates.push({
                    season: key,
                    firstDate: moment(minDate).format('YYYY-MM-DD'),
                    lastDate: moment(maxDate).format('YYYY-MM-DD')
                });
            }
        }
        return seasonsDates;
    }
};

const mutations = {
    setGames(state, games) {
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
                    commit('setGames', json);
                });
            resolve();
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};
