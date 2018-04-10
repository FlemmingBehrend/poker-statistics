// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import MyHybridApp from "./hybrid-app";
import store from "./store/store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
    el: "#app",
    store,
    components: { MyHybridApp },
    template: "<MyHybridApp/>"
});
