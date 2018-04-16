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
                    height: 100,
                    cutoutPercentage: 20,
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        },
        mounted() {
            this.renderChart(this.chartData, this.options);
        }
    };
</script>
