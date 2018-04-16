<template>
    <b-container class="dates">
        <b-row>
            <b-col>
                <b-row>
                    <b-col cols="2">
                        <label>Fra:</label>
                    </b-col>
                    <b-col cols="10">
                        <b-form-input
                            type="date"
                            name="fromDate"
                            v-model="fromDate"
                            size="sm"
                            title="Indtast fra dato (dd-mm-yyyy)"
                            @blur.native="updateChart">
                        </b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="2">
                        <label>Til:</label>
                    </b-col>
                    <b-col cols="10">
                        <b-form-input
                            type="date"
                            name="toDate"
                            v-model="toDate"
                            size="sm"
                            title="Indtast til dato (dd-mm-yyyy)"
                            @blur.native="updateChart">
                        </b-form-input>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                fromDate: undefined,
                toDate: undefined,
                startTooltip: "DD/MM/YYYY"
            }
        },
        methods: {
            updateChart() {
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
</style>
