<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
// 地图上的 图表数据
const props = defineProps({
  // TODO: 理论上数据和类型是可以单独修改 但是目前属于过度设计
  data: {
    type: Array,
    default: null,
  },
  dataType: {
    type: String,
    default: 'pie',
  },
  dataOption: {
    type: Object,
    default: () => ({}),
  },
});

import * as echarts from 'echarts';
import { shallowRef, onMounted, watch, ref, unref, defineProps } from 'vue';
import { registerMap, getCoordsMap } from './assets/geoJson';
import { useOption } from './hooks/useOption';

const actionHistory = ref({});

const coordsMap = getCoordsMap();

const { option, updateOption, goUp, goMultiple } = useOption({
  coordsMap,
});

registerMap(echarts);

const call_updateOption = (action) => {
  const nextAction = {
    ...actionHistory.value,
    ...action,
  };

  updateOption(nextAction);

  // 记住上次的操作 action
  actionHistory.value = nextAction;
};

// chart 实例
let chart = null;

// 监听数据变化
watch(
  () => props.data,
  (data) => {
    const dataset = unref(data);

    if (!dataset) return;

    call_updateOption({
      dataset,
      datasetType: props.dataType,
      dataOption: props.dataOption,
    });
  },
  {
    immediate: true,
    // TODO: 深度监听是否合理??
    deep: true,
  },
);

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
  },
);

const chartRef = shallowRef(null);

const drillDown = (params) => {
  console.log('地图调试数据', '点击下钻', params);

  // 更新 echarts 地图的 option
  call_updateOption({
    name: params.name || '湖北省',
  });
};

onMounted(() => {
  chart = echarts.init(chartRef.value);

  // 移动事件
  // chart.on("georoam", function (params) {
  //   console.log('地图调试数据', "georoam", params);
  // });

  // 点击事件
  chart.on('click', function (params) {
    drillDown(params);
  });

  // 第一次渲染
  setTimeout(() => {
    call_updateOption({
      name: '湖北省',
    });
  }, 0);
});
</script>

<template>
  <div class="wrapper">
    <div class="chart-container" ref="chartRef"></div>
    <div class="background"></div>
  </div>
  <div class="control">
    <button @click="goUp">Up</button>
    <button @click="goMultiple">混合</button>
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
  background-image: url('./assets/bg.png');
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
  background-color: #efefef;
}
</style>
