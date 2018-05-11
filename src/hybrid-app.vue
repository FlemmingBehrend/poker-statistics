<template>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Pokerklanen statistik</a>
            <div class="collapse navbar-collapse">
                <div class="navbar-nav mr-auto">
                    <filter-menu-container></filter-menu-container>
                </div>
                <div>
                    <navbar-filter-container></navbar-filter-container>
                </div>
                <span class="nav-item version">v0.5.0</span>
            </div>
        </nav>
        <typewriter-container></typewriter-container>
        <main role="main" class="container-fluid row">
            <attendance-container></attendance-container>
            <finals-container></finals-container>
            <money-won-container></money-won-container>
            <errors-container></errors-container>
            <!--<form-curve-container></form-curve-container>-->
        </main>
    </div>
</template>

<script>
    import {GAMES_FETCH, PLAYERS_FETCH} from "./store/actions";
    import AttendanceContainer from "./components/attendance/attendance-container";
    import FinalsContainer from "./components/finals/finals-container";
    import MoneyWonContainer from "./components/money-won/money-won-container";
    import ErrorsContainer from "./components/card-errors/card-errors-container";
    import FormCurveContainer from "./components/form-curve/form-curve-container";
    import FilterMenuContainer from "./components/filter/filter-menu-container";
    import FilterContainer from "./components/filter/filter-container";
    import NavbarFilterContainer from "./components/filter/navbar-filter-container";
    import TypewriterContainer from "./components/typewriter/typewriter-container";

    export default {
        components: {
            NavbarFilterContainer,
            FilterMenuContainer,
            FormCurveContainer,
            ErrorsContainer,
            AttendanceContainer,
            FinalsContainer,
            MoneyWonContainer,
            FilterContainer,
            TypewriterContainer
        },
        computed: {
            sharedFiltering() {
                return this.$store.getters.sharedFilter;
            },
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
