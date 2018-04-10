// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import MyHybridApp from "./hybrid-app";
import store from "./store/store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.mixin({
    data: function() {
        return {
            get globalBackgroundColors() {
                return {
                    1: '#0080b8',
                    2: '#00ace4',
                    3: '#00ffd2',
                    4: '#00dd8c',
                    5: '#00b82f',
                    6: '#44e400',
                    7: '#87ff05',
                    8: '#b6dd03',
                    9: '#ddd200'
                };
            }
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: "#app",
    store,
    components: { MyHybridApp },
    template: "<MyHybridApp/>"
});
