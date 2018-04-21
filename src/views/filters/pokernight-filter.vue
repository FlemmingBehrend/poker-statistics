<template>
    <div class="container container-style">
        <div class="col input-group">
            <div class="input-group-prepend">
                <button class="btn dropdown-toggle btn-sm right-side" type="button"
                        data-toggle="dropdown">{{show}}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="#" @click="changeToDate">Dato</a>
                    <a class="dropdown-item" href="#" @click="changeToSince">Tid siden</a>
                </div>
            </div>
            <select @change="update" v-model="selected" class="custom-select">
                <option v-for="dateObj in dates" :value="dateObj.date">
                    <div v-if="show==='Dato'">{{dateObj.renderDate}}</div>
                    <div v-if="show==='Tid siden'">{{dateObj.renderFromNow}}</div>
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["dates"],
        data() {
            return {
                selected: undefined,
                show: 'Dato'
            };
        },
        methods: {
            update() {
                this.$emit("update-by-pokernight", this.selected);
            },
            changeToDate() {
                console.log('change to date');
                this.show = "Dato";
            },
            changeToSince() {
                console.log('change to since');
                this.show = "Tid siden";
            }
        }
    };
</script>

<style scoped>
    .container-style {
        background-color: beige;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .right-side {
        background-color: #EAECEF;
        border-color: #CFD4DB;
        width: 100px;
    }
</style>
