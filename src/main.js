// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import MyHybridApp from "./hybrid-app";
import store from "./store/store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-awesome/icons/sync'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component('icon', Icon);
Vue.mixin({
    data() {
        return {
            get graphColorScheme() {
                return "cb-Greens";
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
