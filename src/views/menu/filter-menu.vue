<template>
    <poker-theme>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="Filtrering" style="opacity: 0.97">
                <hsc-menu-item>
                    <div slot="body" @mousedown.stop>
                        <input type="radio" value="date" name="filterBy" id="dateFilter" v-model="filter.value"
                               @change="update">
                        <label for="dateFilter">På dato</label>
                    </div>
                </hsc-menu-item>
                <hsc-menu-item>
                    <div slot="body" @mousedown.stop>
                        <input type="radio" value="season" name="filterBy" id="seasonFilter" v-model="filter.value"
                               @change="update">
                        <label for="seasonFilter">På season</label>
                    </div>
                </hsc-menu-item>
                <hsc-menu-item>
                    <div slot="body" @mousedown.stop>
                        <input type="radio" value="pokernight" name="filterBy" id="pokernightFilter"
                               v-model="filter.value" @change="update">
                        <label for="pokernightFilter">På pokeraften</label>
                    </div>
                </hsc-menu-item>
                <hsc-menu-separator/>
                <hsc-menu-item>
                    <div slot="body" @mousedown.stop>
                        <input type="checkbox" value="sharedFiltering" name="sharedFiltering" id="sharedFiltering"
                               v-model="shared.value" @change="updateSharedFiltering">
                        <label for="sharedFiltering">Delt filtrering</label>
                    </div>
                </hsc-menu-item>
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </poker-theme>
</template>

<script>
    import {StyleFactory} from "@hscmap/vue-menu";

    const active = {
        backgroundColor: "#484F55"
    };
    const disabled = {
        opacity: "0.5"
    };
    const separator = {
        backgroundColor: "#001e1a"
    };

    export default {
        components: {
            "poker-theme": StyleFactory({
                menu: {
                    background: "#343a40",
                    color: "white",
                    boxShadow: "0 3pt 4pt rgba(0, 0, 0, 0.05)",
                },
                menubar: {
                    background: "transparent",
                    color: "white"
                },
                active,
                disabled,
                separator,
                animation: true
            })
        },
        props: ['filter', 'shared'],
        methods: {
            update(event) {
                this.$emit('update-menu-filter', event, this.filter.value);
            },
            updateSharedFiltering(event) {
                this.$emit('update-menu-shared-filtering', event, this.shared.value);
            }
        }
    };
</script>

<style scoped>
</style>
