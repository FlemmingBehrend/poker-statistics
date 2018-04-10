<script>
    import {Doughnut, mixins} from "vue-chartjs";

    export default {
        extends: Doughnut,
        mixins: [mixins.reactiveProp],
        props: {
            chartData: {
                type: Array | Object,
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
        mounted() {
            this.renderChart(
                this.chartData,
                {responsive: true, maintainAspectRatio: false});
        }
    };
</script>
