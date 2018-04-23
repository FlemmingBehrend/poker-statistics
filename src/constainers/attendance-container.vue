<template>
    <div class="box">
        <div class="header">Deltagelse i pokeraftener
            <span class="badge badge-light">{{numberOfPokernights}}</span>
        </div>
        <attendance-chart :chart-data="dataSet" class="canvas-size"></attendance-chart>
        <filter-container :graph-type="graphType" v-show="!sharedFiltering"></filter-container>
    </div>
</template>

<script>
    import AttendanceChart from "../views/charts/attendance-chart";
    import jmespath from "jmespath";
    import palette from "google-palette";
    import FilterContainer from "./filter-container";
    import {ATTENDANCE_CHART} from "../store/graph-types";

    export default {
        components: {
            FilterContainer,
            AttendanceChart,
        },
        data() {
            return {
                graphType: ATTENDANCE_CHART
            }
        },
        computed: {
            sharedFiltering() {
                return this.$store.getters.sharedFilter;
            },
            numberOfPokernights() {
                return this.$store.getters.numberOfPokernights(this.graphType);
            },
            dataSet() {
                const labels = [];
                const data = [];
                const games = this.$store.getters.games(this.graphType);
                const attIds = jmespath.search(games, "[*].AttendingPlayerIds[]").groupIds();
                const attArr = {Content: []};
                const backgroundColors = palette(this.graphColorScheme, this.$store.getters.numberOfPlayers).map(v => "#"+ v).reverse();
                for (let attId in attIds) {
                    if (attIds.hasOwnProperty(attId)) {
                        attArr.Content.push({PlayerId: attId, Attendance: attIds[attId]});
                    }
                }
                const sorted = jmespath.search(attArr, "sort_by(Content, &Attendance)[*].{PlayerId: PlayerId, Attendance:Attendance}[::-1]");
                sorted.forEach(obj => {
                    labels.push(this.$store.getters.playerName(obj.PlayerId));
                    data.push(obj.Attendance);
                });
                return {
                    labels: labels,
                    datasets: [
                        {
                            backgroundColor: backgroundColors,
                            data: data
                        }
                    ]
                }
            },
        }
    };
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
