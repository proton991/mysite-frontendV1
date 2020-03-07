<template>
    <div id="myMap" ref="myMap"></div>
</template>

<script>
    import mapGenerator from "@/api/mapGenerator";

    let echarts = require('echarts/lib/echarts');
    // eslint-disable-next-line no-irregular-whitespace
    require('echarts/lib/chart/bar');// 引入柱状图组件
    require('echarts/lib/chart/pie');// 引入饼状图组件
    require('echarts/map/js/china.js');// 引入中国地图组件
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/theme/macarons');//引入主题
    require('echarts/theme/shine');//引入主题
    // import mapGenerator from "@/api/mapGenerator";
    import {getnCoVData} from "@/api/home";

    export default {
        name: 'Map',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                chart: null,
            }
        },
        init() {

        },
        created() {
        },
        mounted() {
            this.drawChinaMap();

        },
        updated() {
            if (!this.chart) {
                this.drawChinaMap()
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null
        },
        computed: {},
        methods: {
            drawChinaMap() {
                this.chart = echarts.init(document.getElementById('myMap'), 'macarons');
                this.chart.setOption(mapGenerator, true);
                let option = this.chart.getOption();
                getnCoVData().then(response => {
                    const {data} = response;
                    // console.log(data);
                    // console.log(typeof data)
                    // for (let i = 0; i < ; i++) {
                    //     option.series[0].data.push(data[i]);
                    // }
                    for (let i = 0; i < 34; i++) {
                        option.series[0].data.push(data[i])
                    }

                    this.chart.setOption(option, true);
                });
                window.onresize = function () {
                    this.chart.resize();
                }
                // console.log(option.series[0].data);
            },

        }

    }
</script>

<style scoped>
    #myMap {
        border: 1px solid black;
        margin: 0 auto;
        height: 40rem;
        width: 50rem;
    }
</style>
