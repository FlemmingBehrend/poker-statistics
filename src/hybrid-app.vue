<template>
    <div id="app">
        <img src="./assets/logo.png">
        <games-view></games-view>
        <games-details-view></games-details-view>
    </div>
</template>

<script>
    import gamesView from './views/games-view'
    import gamesDetailsView from './views/game-details-view'

    export default {
        name: 'hybrid-app',
        components: {
            gamesView,
            gamesDetailsView
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
