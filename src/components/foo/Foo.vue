<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Map from '../map/Map.vue';
import { getCoordsMap } from '../map/assets/geoJson';

const coordsMap = getCoordsMap();

const apiData = [
  ['county', '项目数'],
  ['宜昌市', '10'],
  ['武汉市', '20'],
  ['黄石市', '30'],
  ['荆门市', '40'],
];

const apiData2 = [
  ['county', '总金额'],
  ['宜昌市', '150'],
  ['武汉市', '200'],
  ['黄石市', '350'],
  ['荆门市', '400'],
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
  type: 'scatter',
};
</script>

<template>
  <Map :option="option" />
</template>

<style></style>
