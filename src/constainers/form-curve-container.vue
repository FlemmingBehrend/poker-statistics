<template>
    <div class="box">
        <div class="header">Form kurve (sidste 10 pokeraftener)</div>
        <form-curve-chart :chartData="dataSet" class="canvas-size"></form-curve-chart>
    </div>
</template>

<script>
    import FormCurveChart from "../views/charts/form-curve-chart";
    import palette from "google-palette";

    function playerStatus1(playerIds) {
        const object = Object.create(Object.prototype);
        for (const id in playerIds) {
            if (playerIds.hasOwnProperty(id)) {
                object[playerIds[id]] = [0];
            }
        }
        return object;
    }

    export default {
        components: {FormCurveChart},
        computed: {
            dataSet() {
                const winnings = this.$store.getters.winnings("formCurve")
                const playerIds = this.$store.getters.players.map(player => player.id);
                const dataWinnings = playerStatus1(playerIds);
                const dataPayment = playerStatus1(playerIds);
                const backgroundColors = palette(this.graphColorScheme, this.$store.getters.numberOfPlayers).map(v => "#"+ v).reverse();

                for (const gameId in winnings) {
                    const game = winnings[gameId].game;
                    if (game) {
                        const combinedPrized = game.win.prize + game.second.prize;
                        const startIndex = -(combinedPrized / game.attendingPlayerIds.length);
                        for (const playerId in dataWinnings) {
                            if (playerId.toString() === game.win.id.toString()) {
                                dataWinnings[playerId].push(game.win.prize);
                            } else if (playerId.toString() === game.second.id.toString()) {
                                dataWinnings[playerId].push(game.second.prize);
                            } else {
                                dataWinnings[playerId].push(0);
                            }
                        }
                        for (const playerId in dataPayment) {
                            let attended = false;
                            for (const key in game.attendingPlayerIds) {
                                if (game.attendingPlayerIds.hasOwnProperty(key)) {
                                    const attendingPlayerId = game.attendingPlayerIds[key];
                                    if (playerId == attendingPlayerId) {
                                        attended = true;
                                    }
                                }
                            }
                            if (attended) {
                                dataPayment[playerId].push(startIndex);
                            } else {
                                dataPayment[playerId].push(0);
                            }
                        }
                    }

                }

                const indexLength = dataWinnings[1] ? dataWinnings[1].length : 0;

                const form = [];
                const dataSets = [];
                const labels = [...Array(indexLength).keys()];

                for (let i=0; i<this.$store.getters.numberOfPlayers; i++) {
                    form[i] = 0;
                }
                for (let i=1; i<this.$store.getters.numberOfPlayers+1; i++) {
                    const form = [];
                    for (let i=0; i<this.$store.getters.numberOfPlayers; i++) {
                        form[i] = 0;
                    }

                    for (let j = 0; j < indexLength; j++) {
                        if (j>0) {
                            form[j] = form[j-1] + dataWinnings[i][j] + dataPayment[i][j];

                        } else {
                            form[j] = form[j] + dataWinnings[i][j] + dataPayment[i][j];

                        }
                    }

                    dataSets.push({
                        label: this.$store.getters.playerName(i),
                        backgroundColor: backgroundColors[i],
                        data: form,
                        fill: false
                    })
                }

                return {
                    labels: labels,
                    datasets: dataSets
                }
            }
        }
    }
</script>

<style scoped>
    .box {
        width: 400px;
        border: 1px solid cadetblue;
        margin: 5px;
    }

    .canvas-size {
        height: 400px;
    }

    .header {
        background-color: cadetblue;
        font-family: "Arial", serif;
        color: darkslategray;
        font-variant: all-small-caps;
        font-weight: bold;
        vert-align: middle;
        text-align: center;
    }
</style>
