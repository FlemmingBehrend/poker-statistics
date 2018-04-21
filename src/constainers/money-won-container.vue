<template>
    <div class="box">
        <div class="header">Præmier
            <span class="badge badge-light">1= {{totalFirstPrizeMoney}} kr</span>
            <span class="badge badge-light">2= {{totalSecondPrizeMoney}} kr</span>
        </div>
        <money-won-chart :chartData="dataSet" class="canvas-size"></money-won-chart>
        <date-filter v-if="filterOnDate" @update="updateChartData"></date-filter>
        <season-filter v-if="filterOnSeason"></season-filter>
        <pokernight-filter v-if="filterOnPokernight"></pokernight-filter>
    </div>
</template>

<script>
    import DateFilter from "../views/date-filter";
    import SeasonFilter from "../views/season-filter";
    import PokernightFilter from "../views/pokernight-filter";
    import MoneyWonChart from "../views/money-won-chart";
    import palette from "google-palette";
    import jmespath  from "jmespath";
    import {mapGetters} from 'vuex';

    export default {
        components: {
            MoneyWonChart,
            DateFilter,
            SeasonFilter,
            PokernightFilter
        },
        data() {
            return {
                fromDate: undefined,
                toDate: undefined,
            }
        },
        methods: {
            updateChartData(event, fromDate, toDate) {
                this.fromDate = fromDate;
                this.toDate = toDate;
            }
        },
        computed: {
            ...mapGetters({
                filterOnDate: 'filterOnDate',
                filterOnSeason: 'filterOnSeason',
                filterOnPokernight: 'filterOnPokernight'
            }),
            totalFirstPrizeMoney() {
                const winnings = this.$store.getters.winnings(this.fromDate, this.toDate);
                return jmespath.search(winnings, "[*].game.win.prize|sum(@)");
            },
            totalSecondPrizeMoney() {
                const winnings = this.$store.getters.winnings(this.fromDate, this.toDate);
                return jmespath.search(winnings, "[*].game.second.prize|sum(@)");
            },
            dataSet() {
                const backgroundColors = palette(this.graphColorScheme, 2).map(v => "#"+ v).reverse();
                const winnings = this.$store.getters.winnings(this.fromDate, this.toDate);
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
