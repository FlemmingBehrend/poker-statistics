<template>
    <div class="box">
        <div class="header">Præmier
            <span class="badge badge-light">1= {{totalFirstPrizeMoney}} kr</span>
            <span class="badge badge-light">2= {{totalSecondPrizeMoney}} kr</span>
        </div>
        <money-won-chart :chart-data="dataSet" class="canvas-size"></money-won-chart>
        <filter-container :graph-type="graphType" v-show="!sharedFiltering"></filter-container>
    </div>
</template>

<script>
    import MoneyWonChart from "./money-won-chart";
    import FilterContainer from "../filter/filter-container";
    import palette from "google-palette";
    import jmespath  from "jmespath";
    import {MONEY_WON_CHART} from "../../store/graph-types";

    export default {
        components: {
            MoneyWonChart,
            FilterContainer
        },
        data() {
            return {
                graphType: MONEY_WON_CHART
            }
        },
        computed: {
            sharedFiltering() {
                return this.$store.getters.sharedFilter;
            },
            totalFirstPrizeMoney() {
                const winnings = this.$store.getters.winnings(this.graphType);
                return jmespath.search(winnings, "[*].game.win.prize|sum(@)");
            },
            totalSecondPrizeMoney() {
                const winnings = this.$store.getters.winnings(this.graphType);
                return jmespath.search(winnings, "[*].game.second.prize|sum(@)");
            },
            dataSet() {
                const backgroundColors = palette(this.graphColorScheme, 2).map(v => "#"+ v).reverse();
                const winnings = this.$store.getters.winnings(this.graphType);
                const labels = [];
                const winPrizes = [];
                const secondPrizes = [];
                for (let i=1; i<this.$store.getters.numberOfPlayers+1; i++) {
                    labels.push(this.$store.getters.playerName(i));
                    winPrizes.push(jmespath.search(winnings, "[*].game|[?win.id==`" + i + "`].win.prize|sum(@)"));
                    secondPrizes.push(jmespath.search(winnings, "[*].game|[?second.id==`" + i + "`].second.prize|sum(@)"));
                }
                return {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Førsteplads præmie (kr)',
                            backgroundColor: backgroundColors[0],
                            data: winPrizes
                        },
                        {
                            label: 'Andenplads præmie (kr)',
                            backgroundColor: backgroundColors[1],
                            data: secondPrizes
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .box {
        margin: 5px;
        width: 400px;
        border: 1px solid cadetblue;
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
