<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted } from "vue";
// import gsap from "gsap";
import "echarts/extension/bmap/bmap";
import data from "./hubei";

// https://echarts.apache.org/zh/faq.html#others
const chartRef = shallowRef(null);

let chart = null;

const renderChart = async () => {
  chart = echarts.init(chartRef.value);

  echarts.registerMap("Hubei", data);

  const option = {
    series: [
      {
        name: "Hubei Province",
        type: "map",
        roam: true,
        map: "Hubei",
        emphasis: {
          label: {
            show: true,
          },
        },
        scaleLimit: {
          min: 1,
          max: 10,
        },
      },
    ],
  };

  // chart.on("geoselectchanged", function (params) {
  //   console.log("geoselectchanged", params);
  // });

  chart.on("click", function (params) {
    console.log("click", params);
    chart.setOption({
      ...chart.getOption(),
      series: [
        {
          ...chart.getOption().series[0],
          zoom: 2,
        },
      ],
    });
  });

  chart.setOption(option);

  console.log("chart", chart.getOption());
};

onMounted(() => {
  renderChart();
});
</script>

<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
./hubei
