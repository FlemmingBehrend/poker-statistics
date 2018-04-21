<template>
    <div class="container-style container">
        <div class="col">
            <div class="input-group input-group-sm mb-1">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width: 50px">Fra:</span>
                </div>
                <input
                    class="form-control"
                    type="date"
                    name="fromDate"
                    v-model="fromDate"
                    size="sm"
                    title="Indtast fra dato (dd-mm-yyyy)"
                    @blur.native="updateChart">
            </div>
        </div>
        <div class="col">
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text"style="width: 50px">Til:</span>
                </div>
                <input
                    class="form-control"
                    type="date"
                    name="toDate"
                    v-model="toDate"
                    size="sm"
                    title="Indtast til dato (dd-mm-yyyy)"
                    @blur.native="updateChart">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'date-filter',
        data() {
            return {
                fromDate: undefined,
                toDate: undefined,
                startTooltip: "DD/MM/YYYY"
            }
        },
        methods: {
            updateChart() {
                this.$emit('update-by-date', event, this.fromDate, this.toDate);
            }
        }
    }
</script>

<style scoped>
    .container-style {
        background-color: beige;
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
