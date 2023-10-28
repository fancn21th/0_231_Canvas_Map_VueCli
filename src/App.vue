<script setup>
import Map from './components/map/Map.vue';
import { onBeforeMount } from 'vue';
import config from './configs/layerConfig';
const { designWidthPx, designHeightPx, designWidth, designHeight } = config;
import { getCoordsMap } from './components/map/assets/geoJson';

onBeforeMount(() => {
  const scale =
    document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight
      ? document.documentElement.clientWidth / designWidth
      : document.documentElement.clientHeight / designHeight;

  // refer to https://stackoverflow.com/questions/76090183/using-v-bind-to-set-css-vars-in-vue-3-composition-issue
  document.documentElement.style.setProperty('--design-width', designWidthPx);
  document.documentElement.style.setProperty('--design-height', designHeightPx);
  document.documentElement.style.setProperty('--scale', scale);
});

const coordsMap = getCoordsMap();

const apiData = [
  ['county', '项目数', '总金额'],
  ['宜昌市', '16', '900.00'],
  ['武汉市', '13', '700.00'],
  ['孝感市', '12', '720.00'],
  ['十堰市', '9', '700.00'],
];

const apiData2 = [
  ['county', '项目数', '总金额'],
  ['黄冈市', '22', '900.00'],
  ['荆州市', '24', '700.00'],
  ['襄阳市', '50', '700.00'],
];

const formatter = (data) => {
  const res = [];
  // first row
  const [firstColumn, ...rest] = data[0];
  const firstRow = [firstColumn, 'geo', ...rest];
  res.push(firstRow);
  // rest row
  data.slice(1).forEach((item) => {
    const [firstColumn, ...rest] = item;
    const area = coordsMap[firstColumn];
    const center = area.properties?.centroid;
    res.push([firstColumn, center, ...rest]);
  });
  return res;
};

const data = [apiData, apiData2].map((item) => formatter(item));

const option = {
  data,
  legend: {
    top: '5%',
    right: '5%',
    orient: 'vertical',
  },
  series: ['数据A', '数据B'],
  type: 'scatter',
  label: '项目数',
};
</script>

<template>
  <Map :option="option" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  transform: scale(var(--scale));
  transform-origin: left top;
}
</style>
