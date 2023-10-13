<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted, watch } from "vue";
import { nameMap, registerMap, coordsMap } from "./assets/geoJson";
import { useOption } from "./hooks/useOption";

registerMap(echarts);

const { option, updateOption, goUp, goDown } = useOption({
  coordsMap,
  nameMap,
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

onMounted(() => {
  chart = echarts.init(chartRef.value);

  // 移动事件
  chart.on("georoam", function (params) {
    console.log("georoam", params);
  });

  // 点击事件
  chart.on("click", function (params) {
    console.log("click", params);

    const level =
      params.name === "中国"
        ? 1
        : params.name === "湖北省"
        ? 2
        : params.name.includes("市")
        ? 3
        : params.name.includes("区")
        ? 4
        : 2;

    updateOption({
      level,
      name: params.name,
    });
  });

  // 第一次渲染
  setTimeout(() => {
    updateOption({
      level: 2,
      name: "湖北省",
    });
  }, 0);
});
</script>

<template>
  <div class="wrapper">
    <div class="chart-container" ref="chartRef"></div>
    <div class="control">
      <button @click="goUp">上一级</button>
      <button @click="goDown">下一级</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper,
.chart-container {
  width: 100%;
  height: 100%;
}

.wrapper {
  position: relative;
}

.control {
  width: 200px;
  height: 200px;
  background-color: red;
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
