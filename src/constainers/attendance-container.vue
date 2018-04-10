<template>
    <attendance-chart :chart-labels="labels"></attendance-chart>
</template>

<script>
import AttendanceChart from "../views/attendance-chart";

export default {
    components: {
        AttendanceChart

    },
    computed: {
        attendance() {
            const att = [];
            const playerNames = this.$store.getters.playerNames;
            playerNames.forEach(name => {
                att.push(Math.random() * 10);
            });

            const attendingRate = this.$store.getters.attendingRate(2);
            console.log('atten', att);

            return att;
        },
        labels() {
            return this.$store.getters.playerNames
        }
    }

};
</script>

<style scoped>
</style>
