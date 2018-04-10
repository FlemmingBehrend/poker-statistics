<template>
    <div id="app">
        <attendance-container></attendance-container>
    </div>
</template>

<script>
import { PLAYERS_FETCH, GAMES_FETCH } from "./store/actions";
import AttendanceContainer from "./constainers/attendance-container";

export default {
    components: {
        AttendanceContainer
    },
    beforeCreate: function() {
        this.$store.dispatch(PLAYERS_FETCH).then(() => {
            this.$store.dispatch(GAMES_FETCH);
        });
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.center-width {
    width: 700px;
    align-items: center;
    vertical-align: center;
}
</style>
