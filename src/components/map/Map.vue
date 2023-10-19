<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted, watch } from "vue";
import { registerMap, getCoordsMap } from "./assets/geoJson";
import { useOption } from "./hooks/useOption";

const coordsMap = getCoordsMap();

const { option, updateOption } = useOption({
  coordsMap,
});

registerMap(echarts);

// chart 实例
let chart = null;

watch(
  option,
  () => {
    if (option?.value) {
      // TODO: 更新策略
      // https://echarts.apache.org/zh/api.html#echartsInstance.setOption
      chart.setOption(option.value, true);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

const chartRef = shallowRef(null);

const drillDown = (params) => {
  console.log("地图调试数据", "点击下钻", params);

  // 更新 echarts 地图的 option
  updateOption({
    name: params.name || "湖北省",
  });
};

onMounted(() => {
  chart = echarts.init(chartRef.value);

  // 移动事件
  // chart.on("georoam", function (params) {
  //   console.log('地图调试数据', "georoam", params);
  // });

  // 点击事件
  chart.on("click", function (params) {
    drillDown(params);
  });

  // 第一次渲染
  setTimeout(() => {
    updateOption({
      name: "湖北省",
    });
  }, 0);
});
</script>

<template>
  <div class="wrapper">
    <div class="chart-container" ref="chartRef"></div>
    <div class="background"></div>
  </div>
  <div class="control"></div>
</template>

<style scoped>
.wrapper,
.chart-container,
.background {
  width: 100%;
  height: 100%;
}

.wrapper {
  position: relative;
}

.background {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url("./assets/bg.png");
  background-size: cover;
  opacity: 0.5;
}

.control {
  width: 200px;
  height: 200px;
  position: absolute;
  z-index: 999;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
