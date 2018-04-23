<template>
    <div>
        <date-filter v-if="filterOnDate" @update-by-from-date="updateByFromDate" @update-by-to-date="updateByToDate"></date-filter>
        <season-filter v-if="filterOnSeason" :seasons="seasonDates" @update-by-from-date="updateByFromDate" @update-by-to-date="updateByToDate"></season-filter>
        <pokernight-filter v-if="filterOnPokernight" :dates="pokernightDates" @update-by-pokernight="updateByDate"></pokernight-filter>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import DateFilter from '../views/filters/date-filter';
    import PokernightFilter from '../views/filters/pokernight-filter';
    import SeasonFilter from '../views/filters/season-filter';
    import {FILTER_DATE_SET_FROM, FILTER_DATE_SET_TO} from "../store/actions";

    export default {
        props: ['graphType'],
        components: {
            DateFilter,
            PokernightFilter,
            SeasonFilter,
        },
        computed: {
            ...mapGetters({
                filterOnDate: 'filterOnDate',
                filterOnSeason: 'filterOnSeason',
                filterOnPokernight: 'filterOnPokernight',
                pokernightDates: 'pokernightDates',
                seasonDates: 'seasonDates'
            }),
        },
        methods: {
            updateByFromDate(event, fromDate) {
                if (fromDate) {
                    this.$store.dispatch(FILTER_DATE_SET_FROM, {graphType: this.graphType, fromDate: fromDate});
                }
            },
            updateByToDate(event, toDate) {
                if (toDate) {
                    this.$store.dispatch(FILTER_DATE_SET_TO, {graphType: this.graphType, toDate: toDate});
                }
            },
            updateByDate(date) {
                if (date) {
                    this.$store.dispatch(FILTER_DATE_SET_FROM, {graphType: this.graphType, fromDate: date});
                    this.$store.dispatch(FILTER_DATE_SET_TO, {graphType: this.graphType, toDate: date});
                }
            }
        }
    }
</script>

<style scoped>

</style>
