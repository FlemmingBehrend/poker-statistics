<template>
    <div class="box">
        <div class="header">
            Placeringer
        </div>
        <div>
            <game-placement-chart :chartData="dataSet"></game-placement-chart>
        </div>
    </div>
</template>

<script>
    import GamePlacementChart from "../views/game-placement-chart";

    export default {
        components: {
            GamePlacementChart
        },
        computed: {
            dataSet() {
                return {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: '1. plads',
                            backgroundColor: '#f87979',
                            data: [30, 20, 12, 39, 10, 40, 39, 50, 40, 20, 12, 11]
                        },
                        {
                            label: '2. plads',
                            backgroundColor: '#554455',
                            data: [10, 10, 2, 3, 1, 4, 9, 8, 4, 2, 2, 11]
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
