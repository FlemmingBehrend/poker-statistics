import Vue from 'vue';
import Vuex from 'vuex';
import game from './modules/game-store';

Vue.use(Vuex);
Vue.config.debug = true;

const nodeEnvironment = process && process.env && process.env.NODE_ENV;

const store = new Vuex.Store({
    strict: nodeEnvironment === 'development',
    modules: {
        game
    }
});

export default store;
