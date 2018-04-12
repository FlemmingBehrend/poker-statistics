<template>
    <div class="box">
        <div class="header">
            Deltagelse i pokeraftener ({{pokernights}})
        </div>
        <div>
            <attendance-chart :chartData="dataSet" class="canvas-size"></attendance-chart>
        </div>
        <b-container class="dates">
            <b-row>
                <b-col sm="1">
                    <label>Fra:</label>
                </b-col>
                <b-col>
                    <b-form-input type="date" v-model="fromDate"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="1">
                    <label>Til:</label>
                </b-col>
                <b-col>
                    <b-form-input type="date" v-model="toDate"></b-form-input>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import AttendanceChart from "../views/attendance-chart";
    import jmespath from "jmespath";
    import palette from "google-palette";

    export default {
        data() {
            return {
                fromDate: undefined,
                toDate: undefined
            }
        },
        components: {
            AttendanceChart
        },
        computed: {
            pokernights() {
                return this.$store.getters.countPokernights(this.$data.fromDate, this.$data.toDate);
            },
            dataSet() {
                const labels = [];
                const data = [];
                const attIds = this.$store.getters.attendingRate(this.$data.fromDate, this.$data.toDate);
                const attArr = {Content: []};
                const backgroundColors = palette('cb-Greens', this.$store.getters.numberOfPlayers).map(v => "#"+ v).reverse();
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
    width: 20vw;
    border: 1px solid cadetblue;
}
.canvas-size {
    position: relative;
    height: 40vh;
    width: 20vw;
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
.dates {
    padding-top: 10px;
    padding-bottom: 10px;
}
    .refresh {
        width: 100%;
        height: 100%;
    }
</style>
