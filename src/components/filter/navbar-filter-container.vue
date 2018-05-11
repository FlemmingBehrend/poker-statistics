<template>
    <div v-show="sharedFilter">
        <navbar-date-filter v-if="filterOnDate" @update-all-by-from-date="updateAllByFromDate"
                            @update-all-by-to-date="updateAllByToDate"></navbar-date-filter>
        <navbar-season-filter v-if="filterOnSeason" :seasons="seasonDates"
                              @update-all-by-from-date="updateAllByFromDate"
                              @update-all-by-to-date="updateAllByToDate"></navbar-season-filter>
        <navbar-pokernight-filter v-if="filterOnPokernight" :dates="pokernightDates"
                                  @update-all-by-pokernight="updateAllByDate"></navbar-pokernight-filter>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import NavbarDateFilter from './navbar-date-filter';
    import {FILTER_DATE_SET_ALL_FROM, FILTER_DATE_SET_ALL_TO} from "../../store/actions";
    import NavbarPokernightFilter from "./navbar-pokernight-filter";
    import NavbarSeasonFilter from "./navbar-season-filter";

    export default {
        components: {
            NavbarPokernightFilter,
            NavbarDateFilter,
            NavbarSeasonFilter
        },
        computed: {
            ...mapGetters({
                filterOnDate: 'filterOnDate',
                filterOnSeason: 'filterOnSeason',
                filterOnPokernight: 'filterOnPokernight',
                pokernightDates: 'pokernightDates',
                sharedFilter: 'sharedFilter',
                seasonDates: 'seasonDates'
            })
        },
        methods: {
            updateAllByFromDate(event, fromDate) {
                if (fromDate) {
                    this.$store.dispatch(FILTER_DATE_SET_ALL_FROM, {fromDate: fromDate});
                }
            },
            updateAllByToDate(event, toDate) {
                if (toDate) {
                    this.$store.dispatch(FILTER_DATE_SET_ALL_TO, {toDate: toDate});
                }
            },
            updateAllByDate(date) {
                if (date) {
                    this.$store.dispatch(FILTER_DATE_SET_ALL_FROM, {fromDate: date});
                    this.$store.dispatch(FILTER_DATE_SET_ALL_TO, {toDate: date});
                }
            }
        }
    }
</script>

<style scoped>

</style>
