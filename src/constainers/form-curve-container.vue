<template>
    <div class="box">
        <div class="header">Form kurve (sidste 10 pokeraftener)</div>
        <form-curve-chart :chartData="dataSet" class="canvas-size"></form-curve-chart>
    </div>
</template>

<script>
    import FormCurveChart from "../views/charts/form-curve-chart";

    export default {
        components: {FormCurveChart},
        computed: {
            dataSet() {
                return {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: '#f87979',
                            data: [40, 39, 10, 40, 39, 80, 40],
                            fill: false
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .box {
        width: 400px;
        border: 1px solid cadetblue;
        margin: 5px;
    }

    .canvas-size {
        height: 400px;
    }

    .header {
        background-color: cadetblue;
        font-family: "Arial", serif;
        color: darkslategray;
        font-variant: all-small-caps;
        font-weight: bold;
        vert-align: middle;
        text-align: center;
    }
</style>
