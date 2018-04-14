<template>
    <b-container class="dates" fluid>
        <b-row>
            <b-col md="auto" >
                <b-row>
                    <b-col cols="2">
                        <label>Fra:</label>
                    </b-col>
                    <b-col cols="10">
                        <b-form-input type="date" name="fromDate" v-model="fromDate"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="2">
                        <label>Til:</label>
                    </b-col>
                    <b-col cols="10">
                        <b-form-input type="date" name="toDate" v-model="toDate"></b-form-input>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-button class="refresh" variant="primary"  v-on:click="updateChart"><icon name="sync" scale="1.5"></icon></b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                fromDate: undefined,
                toDate: undefined
            }
        },
        methods: {
            updateChart() {
                console.log('update chart');
                this.$emit('update', event, this.fromDate, this.toDate);
            }
        }
    }
</script>

<style scoped>
    .dates {
        background-color: beige;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .refresh {
        width: 50px;
        height: 100%;
    }
</style>
