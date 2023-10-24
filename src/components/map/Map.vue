<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from 'echarts';
import { shallowRef, onMounted, watch } from 'vue';
import { registerMap, getCoordsMap } from './assets/geoJson';
import { useOption } from './hooks/useOption';

const coordsMap = getCoordsMap();

const { option, updateOption, goUp, goMultiple } = useOption({
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
  },
);

const chartRef = shallowRef(null);

const drillDown = (params) => {
  console.log('地图调试数据', '点击下钻', params);

  // 更新 echarts 地图的 option
  updateOption({
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

  const renderRect = () => {
    try {
      const pos = chart.convertToPixel({ geoId: 'S2' }, [114.298572, 30.584355]);

      // 更新 echarts 地图的 option
      updateOption({
        name: '湖北省',
        // name: params.name || '湖北省',
        pos,
      });

      chart.off('finished', renderRect);
    } catch (error) {
      console.error('地图调试数据', error);
    }
  };

  chart.on('finished', renderRect);

  // 第一次渲染
  setTimeout(() => {
    updateOption({
      name: '湖北省',
      dataset: [
        ['county', '项目数', '总金额'],
        ['宜昌市', '16', '900.00'],
        ['武汉市', '13', '700.00'],
        ['孝感市', '12', '720.00'],
        ['十堰市', '9', '700.00'],
      ],
      datasetType: 'scatter',
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
