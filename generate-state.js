const fs = require('fs');
const yaml = require('js-yaml');
const jmespath = require('jmespath');
const players = require('./static/players.json');
const moment = require('moment');
moment.locale('da');
const games = [];

function mapPlayerToId(name) {
    return jmespath.search(players, `players[?name.first==\'${name}\'] | [0].id`);
}

fs.readdir('games', function(err, items) {
    items.forEach(game => {
        let gameState = {};
        const config = yaml.safeLoad(fs.readFileSync('games/' + game, 'utf-8'));
        const indentedJson = JSON.stringify(config, null, 4);
        const gameObj = JSON.parse(indentedJson);
        let pokeraften = gameObj.Pokeraften;

        gameState.Season = pokeraften.Season;
        gameState.Info = {};
        gameState.Info.LocationPlayerId = mapPlayerToId(pokeraften.Where);
        const [day, month, year] = pokeraften.Date.split("/");
        const date = new Date(`${year}-${month}-${day}`);
        const formattedDate = moment(date).format('YYYY-MM-DD');
        gameState.Info.Date = formattedDate;
        gameState.Info.FirstPrize = pokeraften.FirstPrize;
        gameState.Info.SecondPrize = pokeraften.SecondPrize;
        gameState.AttendingPlayerIds = [];
        pokeraften.Attending.forEach(name => gameState.AttendingPlayerIds.push(mapPlayerToId(name)));
        gameState.GamesPlayed = [];
        for (let prop in pokeraften.Games) {
            let localGame = {};
            localGame.GameNumber = prop.slice(4);
            localGame.StartTime = `${pokeraften.Games[prop].Start}`;
            localGame.WinnerPlayerId = mapPlayerToId(pokeraften.Games[prop].Winner);
            localGame.SecondPlayerId = mapPlayerToId(pokeraften.Games[prop].Second);
            gameState.GamesPlayed.push(localGame);
        }
        gameState.Errors = [];
        for (let prop in pokeraften.Errors) {
            let localError = {};
            localError.PlayerId = mapPlayerToId(prop);
            localError.ErrorCount = pokeraften.Errors[prop];
            gameState.Errors.push(localError);
        }
        gameState.Fines = [];
        for (let prop in pokeraften.Fines) {
            let localFine = {};
            localFine.PlayerId = mapPlayerToId(prop);
            localFine.Fine = pokeraften.Fines[prop];
            gameState.Fines.push(localFine);
        }
        games.push(gameState);
    });

    fs.writeFileSync('./static/games.json', JSON.stringify(games, null, 4), 'utf-8');
});



