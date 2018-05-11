<template>
    <div class="container row">
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
                    @blur="updateFromDate">
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
                    @blur="updateToDate">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fromDate: undefined,
                toDate: undefined,
                startTooltip: "DD/MM/ÅÅÅÅ"
            }
        },
        methods: {
            updateFromDate() {
                this.$emit('update-all-by-from-date', event, this.fromDate);
            },
            updateToDate() {
                this.$emit('update-all-by-to-date', event, this.toDate);
            }
        }
    }
</script>

<style scoped>
</style>
