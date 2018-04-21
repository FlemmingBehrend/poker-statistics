<script>
    import {Bar, mixins} from "vue-chartjs";

    export default {
        extends: Bar,
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
                    responsive: true,
                }
            };
        },
        mounted() {
            this.renderChart(
                this.chartData, this.options);
        }
    };
</script>
