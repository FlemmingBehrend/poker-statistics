<template>
    <div class="box">
        <div class="header">Kort fejl
            <span class="badge badge-light">{{errorsTotal}}</span>
        </div>
        <errors-chart :chartData="dataSet" class="canvas-size"></errors-chart>
        <date-filter v-if="filterOnDate" @update="updateChartData"></date-filter>
        <season-filter v-if="filterOnSeason"></season-filter>
        <pokernight-filter v-if="filterOnPokernight"></pokernight-filter>
    </div>
</template>

<script>
    import DateFilter from "../views/date-filter";
    import SeasonFilter from "../views/season-filter";
    import PokernightFilter from "../views/pokernight-filter";
    import ErrorsChart from "../views/errors-chart";
    import palette from "google-palette";
    import jmespath  from "jmespath";
    import {mapGetters} from 'vuex';

    export default {
        components: {
            ErrorsChart,
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
            errorsTotal() {
                const cardErrors = this.$store.getters.cardErrors(this.fromDate, this.toDate);
                return jmespath.search(cardErrors, "[*].ErrorCount|sum(@)");
            },
            dataSet() {
                const backgroundColors = palette(this.graphColorScheme, 2).map(v => "#"+ v).reverse();
                const cardErrors = this.$store.getters.cardErrors(this.fromDate, this.toDate);
                const labels = [];
                const errors = [];
                for (let i=1; i<this.$store.getters.numberOfPlayers+1; i++) {
                    labels.push(this.$store.getters.playerName(i));
                    errors.push(jmespath.search(cardErrors, "[?PlayerId==`" + i + "`]|[*].ErrorCount|sum(@)"));
                }
                return {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Fejl',
                            backgroundColor: backgroundColors[0],
                            data: errors
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
