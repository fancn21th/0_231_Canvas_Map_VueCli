<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted } from "vue";
import "echarts/extension/bmap/bmap";
import data from "./hubei";

// https://echarts.apache.org/zh/faq.html#others
const chartRef = shallowRef(null);

const renderChart = async () => {
  const chart = echarts.init(chartRef.value);
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
      },
    ],
  };
  chart.setOption(option);
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
