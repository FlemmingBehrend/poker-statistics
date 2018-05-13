import Vue from "vue";
import Vuex from "vuex";
import gameStore from "./modules/game-store";
import playerStore from "./modules/player-store";
import filterStore from "./modules/filter-store";
import versionStore from "./modules/version-store";

Vue.use(Vuex);
Vue.config.debug = true;

const nodeEnvironment = process && process.env && process.env.NODE_ENV;

const store = new Vuex.Store({
    strict: nodeEnvironment === "development",
    modules: {
        gameStore,
        playerStore,
        filterStore,
        versionStore
    }
});

export default store;
