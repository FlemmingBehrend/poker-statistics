<template>
    <div>
        <date-filter v-if="filterOnDate" @update-by-date="updateByDate"></date-filter>
        <!--<season-filter v-if="filterOnSeason"></season-filter>-->

        <pokernight-filter
            v-if="filterOnPokernight"
            :dates="pokernightDates"
            @update-by-pokernight="updateByPokernight">
        </pokernight-filter>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import DateFilter from '../views/filters/date-filter';
    import PokernightFilter from '../views/filters/pokernight-filter';

    export default {
        components: {
            DateFilter,
            PokernightFilter
        },
        computed: {
            ...mapGetters({
                filterOnDate: 'filterOnDate',
                filterOnSeason: 'filterOnSeason',
                filterOnPokernight: 'filterOnPokernight',
                pokernightDates: 'pokernightDates'
            }),
        },
        methods: {
            updateByDate(event, fromDate, toDate) {
                this.$emit('update-chart-data', event, fromDate, toDate)
            },
            updateByPokernight(date) {
                this.$emit('update-chart-data', null, date, date);
            }

        }
    }
</script>

<style scoped>

</style>
