<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import * as echarts from "echarts";
import { shallowRef, onMounted } from "vue";
import hubeiJson from "./hubei.json";
import { calcBoundingCoords } from "./calc";

let geoData = hubeiJson;

// 辅助数据
const boundingCoordsMap = geoData.features.reduce((acc, feature) => {
  return {
    ...acc,
    [feature.properties.name]: {
      boundingCoords: calcBoundingCoords(feature),
    },
  };
}, {});

const chartRef = shallowRef(null);

// echarts 实例
let chart = null;

const debug = (stage) => {
  console.log(stage, "chart.getOption()", chart.getOption());
};

// 渲染图表
const renderChart = async () => {
  chart = echarts.init(chartRef.value);

  echarts.registerMap("hubei", hubeiJson);

  const option = {
    series: [
      {
        name: "hubei",
        type: "map",
        roam: true,
        map: "hubei",
        emphasis: {
          label: {
            show: true,
          },
        },
        scaleLimit: {
          min: 1,
          max: 10,
        },
      },
    ],
  };

  // 移动事件
  chart.on("georoam", function (params) {
    console.log("georoam", params);
    console.log(
      "左上角经纬度",
      chart.convertFromPixel({ seriesName: "hubei" }, [0, 0])
    );

    console.log(
      "右下角经纬度",
      chart.convertFromPixel({ seriesName: "hubei" }, [600, 600])
    );
  });

  // 点击事件
  chart.on("click", function (params) {
    console.log("click", params);

    // chart.setOption({
    //   ...chart.getOption(),
    //   series: [
    //     {
    //       ...chart.getOption().series[0],
    //       zoom: 2,
    //     },
    //   ],
    // });

    const cords = boundingCoordsMap[params.name].boundingCoords;

    chart.setOption({
      ...chart.getOption(),
      boundingCoords: [
        // 定位左上角经纬度
        cords[0],
        // 定位右下角经纬度
        cords[1],
      ],
    });

    debug("点击事件");
  });

  chart.setOption(option);

  debug("初始化完成");
};

onMounted(() => {
  renderChart();
});
</script>

<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<style scoped>
.chart-container {
  width: 600px;
  height: 600px;
  border: 1px solid #ccc;
}
</style>
./hubei
