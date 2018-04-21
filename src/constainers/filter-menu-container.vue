<template>
    <filter-menu :input="input" @update-menu-filter="updateFilter"></filter-menu>
</template>

<script>
import FilterMenu from "../views/filter-menu";
import { FILTER_UPDATE } from "../store/actions";

export default {
    components: {
        FilterMenu
    },
    computed: {
        input() {
            return {value: this.$store.getters.filterOn};
        }
    },
    methods: {
        updateFilter(event, val) {
            this.$store.dispatch(FILTER_UPDATE, val);
        }
    }
};
</script>

<style scoped>
</style>
