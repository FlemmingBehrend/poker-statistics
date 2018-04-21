// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import MyHybridApp from "./hybrid-app";
import store from "./store/store";
import * as VueMenu from "@hscmap/vue-menu";
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.min");

Array.prototype.groupIds = function () {
    return this.reduce((acc, cur) => {
        if (typeof acc[cur] === "undefined") {
            acc[cur] = 1;
        } else {
            acc[cur] += 1;
        }
        return acc;
    }, {});
};

Vue.config.productionTip = false;
Vue.use(VueMenu);

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
