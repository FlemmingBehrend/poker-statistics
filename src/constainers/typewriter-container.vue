<template>
    <p id="typewriter"></p>
</template>

<script>
    import TypeIt from 'typeit';

    export default {
        data() {
            return {
                text: ['Stats will be displayed here !!']
            }
        },
        mounted: function() {
            const getNewText = () => {
                return ['Random number: ' + Math.random() + ' : ' + this.$store.getters.numberOfPlayers];
            };
            this.instance = new TypeIt('#typewriter', {
                beforeString: function(step, queue, instance) {
                    instance.pause(3000).delete();
                },
                speed: 100,
                strings: this.text,
                autoStart: true,
                afterString: function(step, queue, instance) {
                    instance.type(getNewText());
                }
            });
        },
    }
</script>

<style scoped>

</style>
