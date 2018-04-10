<template>
    <attendance-chart :chartData="dataSet"></attendance-chart>
</template>

<script>
    import AttendanceChart from "../views/attendance-chart";

    export default {
        components: {
            AttendanceChart

        },
        computed: {
            dataSet() {
                const labels = [];
                const data = [];
                const backgroundColors = [];
                const attIds = this.$store.getters.attendingRate;
                for (let attId in attIds) {
                    labels.push(this.$store.getters.playerName(attId));
                    data.push(attIds[attId]);
                    backgroundColors.push(this.globalBackgroundColors[attId]);
                }
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
</style>
