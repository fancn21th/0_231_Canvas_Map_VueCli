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
    if (params.name.includes("市")) {
      updateOption({
        level: 3,
        name: params.name,
      });
    }
    debug("点击事件");
  });

  setTimeout(() => {
    updateOption({
      level: 2,
      name: "湖北省",
    });
  }, 0);

  goDown();
  goUp();
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
