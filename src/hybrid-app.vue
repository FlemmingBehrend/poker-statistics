<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Pokerklanen statistik</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
                <span class="nav-item version">v0.2.0</span>
            </div>
        </nav>
        <main role="main" class="container-fluid row">
            <attendance-container></attendance-container>
            <game-placement-container></game-placement-container>
            <money-won-container></money-won-container>
            <errors-container></errors-container>
        </main>
    </div>
</template>

<script>
    import {GAMES_FETCH, PLAYERS_FETCH} from "./store/actions";
    import AttendanceContainer from "./constainers/attendance-container";
    import GamePlacementContainer from "./constainers/finals-container";
    import MoneyWonContainer from "./constainers/money-won-container";
    import ErrorsContainer from "./constainers/errors-container";

    export default {
        components: {
            ErrorsContainer,
            AttendanceContainer,
            GamePlacementContainer,
            MoneyWonContainer,
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

    .version {
        color: cadetblue;
    }
</style>
