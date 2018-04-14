<template>
    <div class="box">
        <div class="header">Finaler ({{numberOfFinals}})</div>
        <finals-chart :chartData="dataSet"></finals-chart>
        <date-filter @update="updateChartData"></date-filter>
    </div>
</template>

<script>
    import FinalsChart from "../views/finals-chart";
    import DateFilter from "../views/date-filter";
    import palette from "google-palette";

    export default {
        components: {
            FinalsChart,
            DateFilter
        },
        data() {
            return {
                fromDate: undefined,
                toDate: undefined,
                numberOfFinals: 0
            }
        },
        methods: {
            updateChartData(event, fromDate, toDate) {
                this.fromDate = fromDate;
                this.toDate = toDate;
            }
        },
        computed: {
            dataSet() {
                const finals = this.$store.getters.finalists(this.fromDate, this.toDate);
                const labels = Object.keys(finals.winners).map(id => this.$store.getters.playerName(id)[0]);
                const firstPlace = Object.keys(finals.winners).map(id => finals.winners[id]);
                const secondPlace = Object.keys(finals.runnersUp).map(id => finals.runnersUp[id]);
                const backgroundColors = palette(this.graphColorScheme, 2).map(v => "#"+ v).reverse();
                this.numberOfFinals = firstPlace.reduce((acc, cur) => {
                    return acc + cur;
                }, 0);
                return {
                    labels: labels,
                    datasets: [
                        {
                            label: '1. plads',
                            backgroundColor: backgroundColors[0],
                            data: firstPlace
                        },
                        {
                            label: '2. plads',
                            backgroundColor: backgroundColors[1],
                            data: secondPlace
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .box {
        width: 30vw;
        border: 1px solid cadetblue;
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
