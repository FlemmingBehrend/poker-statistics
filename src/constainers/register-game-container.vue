<!--<template>-->
    <!--<div>-->
        <!--<b-container>-->
            <!--<b-row>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">Hos:</label>-->
                    <!--<b-form-select v-model="holder" :options="options"/>-->
                <!--</b-col>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">Dato:</label>-->
                    <!--<b-form-input v-model="date" placeholder="dd/mm/åååå" type="date"/>-->
                <!--</b-col>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">Season:</label>-->
                    <!--<b-form-input v-model="season" type="number"/>-->
                <!--</b-col>-->
            <!--</b-row>-->
            <!--<b-row>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">Deltagere:</label>-->
                    <!--<b-form-select v-model="playersPlaying" :options="options" :multiple="true"/>-->
                <!--</b-col>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">Første præmie:</label>-->
                    <!--<b-form-input v-model="firstPrize" type="number"/>-->
                    <!--<label class="mr-sm-2">Anden præmie:</label>-->
                    <!--<b-form-input v-model="secondPrize" type="number"/>-->
                <!--</b-col>-->
            <!--</b-row>-->
        <!--</b-container>-->
        <!--<b-container>-->
            <!--<b-row>-->
                <!--<b-col>-->
                    <!--Pokerspil:-->
                <!--</b-col>-->
            <!--</b-row>-->
            <!--<b-row>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">Start</label>-->
                    <!--<b-form-input v-model="startTime" type="time"/>-->
                <!--</b-col>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">1. plads</label>-->
                    <!--<b-form-select v-model="winner" :options="options"/>-->
                <!--</b-col>-->
                <!--<b-col>-->
                    <!--<label class="mr-sm-2">2. plads</label>-->
                    <!--<b-form-select v-model="second" :options="options"/>-->
                <!--</b-col>-->
                <!--<b-col class="mr-sm-1">-->
                    <!--<b-button @click="addGame">Tilføj</b-button>-->
                <!--</b-col>-->
            <!--</b-row>-->
            <!--<b-row>-->
                <!--<b-table striped :items="displayGames"></b-table>-->
            <!--</b-row>-->
        <!--</b-container>-->
        <!--<b-container>-->
            <!--<b-row>-->
                <!--<b-col>-->
                    <!--<b-row>-->
                        <!--<b-col>-->
                            <!--Kortfejl:-->
                        <!--</b-col>-->
                    <!--</b-row>-->
                    <!--<b-row v-for="player in players" :key="player.id">-->
                        <!--<b-col>-->
                            <!--<label class="mr-sm-2">{{player.name.first}}</label>-->
                        <!--</b-col>-->
                        <!--<b-col>-->
                            <!--<b-form-input type="number" :id="'errors' + player.id"/>-->
                        <!--</b-col>-->
                    <!--</b-row>-->
                <!--</b-col>-->
                <!--<b-col>-->
                    <!--<b-row>-->
                        <!--<b-col>-->
                            <!--Bøder:-->
                        <!--</b-col>-->
                    <!--</b-row>-->
                    <!--<b-row v-for="player in players" :key="player.id">-->
                        <!--<b-col>-->
                            <!--<label class="mr-sm-2">{{player.name.first}}</label>-->
                        <!--</b-col>-->
                        <!--<b-col>-->
                            <!--<b-form-input type="number" :id="'fines' + player.id"/>-->
                        <!--</b-col>-->
                    <!--</b-row>-->
                <!--</b-col>-->
            <!--</b-row>-->
        <!--</b-container>-->
        <!--<b-container>-->
            <!--<b-button @click="saveGame">Gem spil</b-button>-->
        <!--</b-container>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import RegisterGame from "../views/register-game";-->
    <!--import {mapGetters} from "vuex";-->

    <!--export default {-->
        <!--components: {RegisterGame},-->
        <!--data() {-->
            <!--return {-->
                <!--holder: null,-->
                <!--date: null,-->
                <!--season: null,-->
                <!--playersPlaying: [],-->
                <!--firstPrize: null,-->
                <!--secondPrize: null,-->
                <!--startTime: null,-->
                <!--winner: null,-->
                <!--second: null,-->
                <!--games: []-->
            <!--};-->
        <!--},-->
        <!--computed: {-->
            <!--...mapGetters({-->
                <!--players: "players"-->
            <!--}),-->
            <!--options() {-->
                <!--return this.$store.getters.players.reduce((pre, cur) => {-->
                    <!--pre.push({-->
                        <!--value: cur.id,-->
                        <!--text: cur.name.first + " " + cur.name.last-->
                    <!--});-->
                    <!--return pre;-->
                <!--}, []);-->
            <!--},-->
            <!--displayGames() {-->
                <!--return this.$data.games.reduce((pre, cur) => {-->
                    <!--const firstName = id => this.$store.getters.players.find(element => element.id === id).name.first;-->

                    <!--pre.push({-->
                        <!--startTime: cur.start,-->
                        <!--winner: firstName(cur.winner),-->
                        <!--second: firstName(cur.second)-->
                    <!--});-->
                    <!--return pre;-->
                <!--}, [])-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--saveGame: function() {-->
                <!--const game = {};-->
                <!--const d = this.$data;-->
                <!--game.holder = d.holder;-->
                <!--game.date = d.date;-->
                <!--game.season = d.season;-->
                <!--game.participants = d.playersPlaying;-->
                <!--game.firstPrize = d.firstPrize;-->
                <!--game.secondPrise = d.secondPrize;-->
                <!--game.games = d.games;-->


                <!--console.log("save", game);-->
                <!--let json = JSON.stringify(game);-->
                <!--console.log(json);-->

            <!--},-->
            <!--addGame: function() {-->
                <!--this.$data.games.push({-->
                    <!--start: this.$data.startTime,-->
                    <!--winner: this.$data.winner,-->
                    <!--second: this.$data.second-->
                <!--});-->
            <!--}-->
        <!--}-->
    <!--};-->

<!--</script>-->

<!--<style scoped>-->
<!--</style>-->
