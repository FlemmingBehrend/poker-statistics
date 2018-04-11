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
                        position: "bottom"
                    },
                    responsive: true,
                }
            };
        },
        mounted() {
            const chart = this.renderChart(
                this.chartData,
                {
                    cutoutPercentage: 30,
                    responsive: true,
                    maintainAspectRatio: false
                }
             );
        }
    };
</script>
