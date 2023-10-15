<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted, watch, ref } from "vue";
import { getNameMap, registerMap, getCustomCoordsMap } from "./assets/geoJson";
import { useOption } from "./hooks/useOption";

registerMap(echarts);

const { option, updateOption, goUp, goMultiple } = useOption({
  coordsMap: getCustomCoordsMap(),
  nameMap: getNameMap(),
});

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

const history = ref(null);

onMounted(() => {
  chart = echarts.init(chartRef.value);

  // 移动事件
  // chart.on("georoam", function (params) {
  //   console.log("georoam", params);
  // });

  // 点击事件
  chart.on("click", function (params) {
    console.log("点击下钻", params);
    if (history.value === "混合") {
      return;
    }

    updateOption({
      name: params.name || "湖北省",
    });

    history.value = params.name;
  });

  // 第一次渲染
  setTimeout(() => {
    updateOption({
      name: "湖北省",
      dataset: [
        ["category", "A", "B", "C", "D", "E"],
        ["武汉市", 1, 4, 2, 3, 4],
        ["十堰市", 2, 3, 2, 4, 2],
        ["宜昌市", 3, 2, 2, 5, 1],
        ["恩施土家族苗族自治州", 4, 1, 21, 9, 5],
        ["神农架林区", 4, 1, 21, 9, 5],
      ],
      datasetType: "pie",
    });
  }, 0);
});

// 切换到上一级

// 切换到混合区域
const goToSpecific = () => {
  console.log("点击下钻到混合");
  history.value = "混合";
  goMultiple();
};

const goToUpLevel = () => {
  console.log("点击下钻到上一级");
  history.value = null;
  goUp();
};
</script>

<template>
  <div class="wrapper">
    <div class="chart-container" ref="chartRef"></div>
    <div class="control">
      <button @click="goToUpLevel">上一级</button>
      <button @click="goToSpecific">混合</button>
    </div>
    <div class="background"></div>
  </div>
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
