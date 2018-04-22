<template>
    <div class="box">
        <div class="header">Kort fejl
            <span class="badge badge-light">{{errorsTotal}}</span>
        </div>
        <errors-chart :chart-data="dataSet" class="canvas-size"></errors-chart>
        <filter-container :graph-type="graphType"></filter-container>
    </div>
</template>

<script>
    import ErrorsChart from "../views/charts/card-errors-chart";
    import palette from "google-palette";
    import jmespath  from "jmespath";
    import FilterContainer from "./filter-container";
    import {CARD_ERRORS_CHART} from "../store/graph-types";

    export default {
        components: {
            FilterContainer,
            ErrorsChart,
        },
        data() {
            return {
                graphType: CARD_ERRORS_CHART
            }
        },
        computed: {
            errorsTotal() {
                const cardErrors = this.$store.getters.cardErrors(this.graphType);
                return jmespath.search(cardErrors, "[*].ErrorCount|sum(@)");
            },
            dataSet() {
                const backgroundColors = palette(this.graphColorScheme, 2).map(v => "#"+ v).reverse();
                const cardErrors = this.$store.getters.cardErrors(this.graphType);
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
