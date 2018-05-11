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
                let firstName, lastName;
                if (Math.random() >= 0.5) {
                    firstName = winnerName;
                    lastName = loserName;
                } else {
                    firstName = loserName;
                    lastName = winnerName;
                }
                return `${firstName} og ${lastName} har mødt hinanden ${winAmount + lossAmount} gange i finalen,
                       <strong>${winnerName}</strong> har vundet ${winAmount} af dem`
            };
            const getNewText = () => {
                const playerIds = this.$store.getters.playerIds;
                const playerOne = playerIds[Math.floor(Math.random() * playerIds.length)];
                const filteredPlayerIds = playerIds.filter(id => id != playerOne);
                const playerTwo = filteredPlayerIds[Math.floor(Math.random() * filteredPlayerIds.length)];
                const games = this.$store.getters.games();
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
            let text = ['Hvem vinder over hvem????'];
            this.instance = new TypeIt('#typewriter', {
                beforeString: (step, queue, instance) => {
                    text = getNewText();
                    instance.pause(1000).delete();
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
