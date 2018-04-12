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
                    cutoutPercentage: 30,
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
