<template>
    <div class="container">
        <div class="col input-group">
            <div class="input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text" style="width: 70px">Season:</span>
                </div>
                <select @change="update" v-model="selected" class="custom-select">
                    <option v-for="seasonObj in seasons" :value="seasonObj">
                        <div>{{seasonObj.season}}</div>
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['seasons'],
        data() {
            return {
                selected: undefined,
            };
        },
        methods: {
            update() {
                this.$emit("update-all-by-from-date", null, this.selected.firstDate);
                this.$emit("update-all-by-to-date", null, this.selected.lastDate);
            },
        }
    }
</script>

<style scoped>
</style>
