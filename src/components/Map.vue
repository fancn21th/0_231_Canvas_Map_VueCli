<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted, onBeforeMount } from "vue";
import json from "./assets";
import { calcBoundingCoords } from "./calc";
import merge from "lodash/mergeWith";

// const designWidth = 800;
// const designHeight = 800;
// const designWidthPx = `1400px`;
// const designHeightPx = `1200px`;

onBeforeMount(() => {
  // document.documentElement.style.setProperty("--design-width", designWidthPx);
  // document.documentElement.style.setProperty("--design-height", designHeightPx);
});

echarts.registerMap("china", json.china);
echarts.registerMap("hubei", json.hubei);
echarts.registerMap("wuhan", json.wuhan);

// 辅助数据
const chinaBoundingCoordsMap = json.china.features.reduce((acc, feature) => {
  return {
    ...acc,
    [feature.properties.name]: {
      boundingCoords: calcBoundingCoords(feature),
    },
  };
}, {});

const hubeiBoundingCoordsMap = json.hubei.features.reduce((acc, feature) => {
  return {
    ...acc,
    [feature.properties.name]: {
      boundingCoords: calcBoundingCoords(feature),
    },
  };
}, {});

const coordsMap = merge(chinaBoundingCoordsMap, hubeiBoundingCoordsMap);

const chartRef = shallowRef(null);

// echarts 实例
let chart = null;

const debug = (stage) => {
  console.log(stage, "chart.getOption()", chart.getOption());
};

// 渲染图表
const renderChart = async () => {
  chart = echarts.init(chartRef.value);

  const option = {
    geo: [
      {
        id: "L1",
        zlevel: 1,
        map: "china",
        label: {
          normal: {
            show: true,
          },
        },
        boundingCoords: coordsMap["武汉市"].boundingCoords,
      },
      {
        id: "L2",
        zlevel: 2,
        map: "hubei",
        label: {
          normal: {
            show: true,
          },
        },
        boundingCoords: coordsMap["武汉市"].boundingCoords,
      },
      {
        id: "L3",
        zlevel: 3,
        map: "wuhan",
        label: {
          normal: {
            show: true,
          },
        },
        boundingCoords: coordsMap["武汉市"].boundingCoords,
      },
    ],
  };

  // 移动事件
  chart.on("georoam", function (params) {
    console.log("georoam", params);
    debug("拖动事件");
  });

  // 点击事件
  chart.on("click", function (params) {
    console.log("click", params);

    chart.setOption({
      geo: chart.getOption().geo.map((item) => ({
        ...item,
        zoom: 2,
      })),
    });

    debug("点击事件");
  });

  chart.setOption(option);

  debug("初始化完成");
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
  /* width: var(--design-width);
  height: var(--design-height); */
  border: 1px solid #ccc;
}
</style>
./hubei
