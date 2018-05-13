<template>
    <Versions :current-version="currentVersion" :versions="versions"></Versions>
</template>

<script>
    import Versions from "./versions";
    import {VERSIONS_LOAD} from "../../store/actions";
    export default {
        components: {
              Versions
        },
        computed: {
            currentVersion() {
                return this.$store.getters.currentVersion ? this.$store.getters.currentVersion.tag : '';
            },
            versions() {
              return this.$store.getters.versions;
            }
        },
        created() {
            this.$store.dispatch(VERSIONS_LOAD);
        }
    }
</script>

<style scoped>

</style>
