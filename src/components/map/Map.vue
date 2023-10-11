<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted, onBeforeMount, watch } from "vue";
import json from "./assets/geoJson";
import { calcBoundingCoords } from "./utils";
import merge from "lodash/mergeWith";
import { useOption } from "./hooks/useOption";

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

// 坐标的字典
const coordsMap = merge(chinaBoundingCoordsMap, hubeiBoundingCoordsMap);

const { option, updateOption, goUp, goDown } = useOption({
  coordsMap,
});

watch(
  option,
  () => {
    if (option?.value) {
      chart.setOption(option.value);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

const chartRef = shallowRef(null);

// echarts 实例
let chart = null;

// debugger
const debug = (stage) => {
  console.log(stage, "chart.getOption()", chart.getOption());
};

onMounted(() => {
  chart = echarts.init(chartRef.value);

  // 移动事件
  chart.on("georoam", function (params) {
    console.log("georoam", params);
    debug("拖动事件");
  });

  // 点击事件
  chart.on("click", function (params) {
    console.log("click", params);

    goDown();
    goUp();

    chart.setOption({
      geo: chart.getOption().geo.map((item) => ({
        ...item,
        zoom: 2,
      })),
    });
    debug("点击事件");
  });

  setTimeout(() => {
    updateOption({
      level: 2,
    });
  }, 0);
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
}
</style>
./hubei ./assets/geoJson
