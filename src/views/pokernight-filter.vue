<template>
    <div>
        <select @change="update" v-model="selected">
            <option
                v-for="dateObj in dates"
                :value="dateObj.date"
            >{{dateObj.renderDate}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ["dates"],
        data() {
            return {
                selected: undefined
            }
        },
        methods: {
            update() {
                this.$emit('update-by-pokernight', this.selected);
            }
        }
    }
</script>

<style scoped>

</style>
