<template>
    <div class="box">
        <div class="header">Deltagelse i pokeraftener
            <span class="badge badge-light">{{pokernights}}</span>
        </div>
        <attendance-chart :chartData="dataSet" class="canvas-size"></attendance-chart>
        <date-filter @update="updateChartData"></date-filter>
    </div>
</template>

<script>
    import AttendanceChart from "../views/attendance-chart";
    import DateFilter from "../views/date-filter";
    import jmespath from "jmespath";
    import palette from "google-palette";

    export default {
        components: {
            AttendanceChart,
            DateFilter
        },
        data() {
            return {
                fromDate: undefined,
                toDate: undefined
            }
        },
        methods: {
            updateChartData(event, fromDate, toDate) {
                this.fromDate = fromDate;
                this.toDate = toDate;
            }
        },
        computed: {
            pokernights() {
                return this.$store.getters.getNumberOfPokernights(this.$data.fromDate, this.$data.toDate);
            },
            dataSet() {
                const labels = [];
                const data = [];
                const games = this.$store.getters.getGames(this.fromDate, this.toDate);
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
    /*position: relative;*/
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
