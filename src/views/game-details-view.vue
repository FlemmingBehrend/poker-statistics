<template>
    <div>
        Game details view
        <game-card></game-card>
    </div>
</template>

<script>
    import gameCard from './../components/game-card';

    export default {
        name: "game-details-view",
        components: {
            gameCard
        }
    }
</script>

<style scoped>

</style>
