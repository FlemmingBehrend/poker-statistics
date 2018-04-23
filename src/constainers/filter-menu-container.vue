<template>
    <filter-menu :filter="filter" :shared="shared" @update-menu-filter="updateFilter"
                 @update-menu-shared-filtering="updateShared"></filter-menu>
</template>

<script>
    import FilterMenu from "../views/menu/filter-menu";
    import {FILTER_DATE_RESET, FILTER_UPDATE, SHARED_FILTERING_UPDATE} from "../store/actions";

    export default {
        components: {
            FilterMenu
        },
        computed: {
            filter() {
                return {value: this.$store.getters.filterOn};
            },
            shared() {
                return {value: this.$store.getters.sharedFilter}
            }
        },
        methods: {
            updateFilter(event, val) {
                this.$store.dispatch(FILTER_DATE_RESET).then(() => {
                    this.$store.dispatch(FILTER_UPDATE, val);
                });
            },
            updateShared(event, val) {
                this.$store.dispatch(SHARED_FILTERING_UPDATE, val);
            }
        }
    };
</script>

<style scoped>
</style>
