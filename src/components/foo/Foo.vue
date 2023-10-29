<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Map from '../map/Map.vue';
import { getCoordsMap } from '../map/assets/geoJson';

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

<style></style>
