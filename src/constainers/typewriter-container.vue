<template>
    <p id="typewriter"></p>
</template>

<script>
    import TypeIt from 'typeit';
    import jmespath from "jmespath";

    export default {
        mounted: function() {
            const createMessage = (winner, winAmount, loser, lossAmount) => {
                const winnerName = this.$store.getters.playerName(winner);
                const loserName = this.$store.getters.playerName(loser);
                return `${winnerName} og ${loserName} har mødt hinanden ${winAmount + lossAmount} gange i finalen,
                       <strong>${winnerName}</strong> har vundet ${winAmount} af dem`
            };
            const getNewText = () => {
                const numberOfPlayers = this.$store.getters.numberOfPlayers;
                const games = this.$store.getters.games();
                let playerOne = Math.round(Math.random() * numberOfPlayers);
                let playerTwo = Math.round(Math.random() * numberOfPlayers);
                if (playerOne === playerTwo) {
                    if (playerOne < 10) {
                        playerOne = playerOne - 1;
                    }
                }
                const playerOneWins = jmespath.search(games, 'length([*].GamesPlayed[?WinnerPlayerId==`'+ playerOne +'`][]|[?SecondPlayerId==`'+ playerTwo +'`])');
                const playerTwoWins = jmespath.search(games, 'length([*].GamesPlayed[?WinnerPlayerId==`'+ playerTwo +'`][]|[?SecondPlayerId==`'+ playerOne +'`])');
                if (playerOneWins > playerTwoWins) {
                    const msg = createMessage(playerOne, playerOneWins, playerTwo, playerTwoWins);
                    return [msg];
                } else {
                    const msg = createMessage(playerTwo, playerTwoWins, playerOne, playerOneWins);
                    return [msg];
                }
            };
            let text = ['Stats will be displayed here !!'];
            this.instance = new TypeIt('#typewriter', {
                beforeString: (step, queue, instance) => {
                    text = getNewText();
                    instance.pause(3000).delete();
                },
                speed: 100,
                strings: text,
                autoStart: true,
                afterString: (step, queue, instance) => {
                    instance.type(text);
                }
            });
        },
    }
</script>

<style scoped>
    p {
        text-align: center;
        color: #0c5460;
        font-weight: bold;
        font-size: xx-large;
    }
</style>
