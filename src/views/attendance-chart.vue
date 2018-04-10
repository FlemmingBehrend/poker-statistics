<template>
    <div>
        hello world
    </div>
</template>

<script>
import { Doughnut, mixins } from "vue-chartjs";

export default {
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    props: {
        chartData: {
            type: Array | Object,
            required: false
        },
        chartLabels: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            options: {
                title: {
                    display: true,
                    text: "Deltagelse"
                },
                responsive: true,
            }
        };
    },
    methods: {
        render() {
            this.renderChart(
                {
                    labels: this.chartLabels,
                    datasets: [{ data: this.chartData }]
                },
                this.options
            );
        }

    },
    mounted() {
        console.log('labels: ', this.chartLabels);
        console.log('data:', this.chartData);
        this.render();
    }
};
</script>

<style scoped>
</style>
