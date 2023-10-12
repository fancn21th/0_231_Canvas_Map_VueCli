import { calcBoundingCoords } from "../../utils";
import merge from "lodash/mergeWith";

import china from "./china.json";
import hubei from "./hubei.json";
import wuhan from "./city/武汉市.json";
import shiyan from "./city/十堰市.json";
import yichang from "./city/宜昌市.json";

// 地图的字典
export const nameMap = {
  武汉市: "wuhan",
  十堰市: "shiyan",
  宜昌市: "yichang",
};

// 注册地图
export const registerMap = (echarts) => {
  if (!echarts) throw new Error("echarts is required");
  echarts.registerMap("china", china);
  echarts.registerMap("hubei", hubei);
  echarts.registerMap("wuhan", wuhan);
  echarts.registerMap("shiyan", shiyan);
  echarts.registerMap("yichang", yichang);
};

// 辅助数据
const chinaBoundingCoordsMap = china.features.reduce((acc, feature) => {
  return {
    ...acc,
    [feature.properties.name]: {
      boundingCoords: calcBoundingCoords(feature),
    },
  };
}, {});

const hubeiBoundingCoordsMap = hubei.features.reduce((acc, feature) => {
  return {
    ...acc,
    [feature.properties.name]: {
      boundingCoords: calcBoundingCoords(feature),
    },
  };
}, {});

// 坐标的字典
export const coordsMap = merge(chinaBoundingCoordsMap, hubeiBoundingCoordsMap);
