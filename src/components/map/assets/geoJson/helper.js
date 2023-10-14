import { calcBoundingCoords } from "../../utils";
import merge from "lodash/mergeWith";

import { dataMap } from "./mapping";

// 注册地图
export const registerMap = (echarts) => {
  if (!echarts) throw new Error("echarts is required");

  Object.keys(dataMap).forEach((name) => {
    echarts.registerMap(name, dataMap[name]);
  });
};

// 坐标的字典
export const coordsMap = Object.keys(dataMap).reduce((acc, areaName) => {
  const area = dataMap[areaName];
  return merge(
    acc,
    area.features.reduce((acc, feature) => {
      return {
        ...acc,
        [feature.properties.name]: {
          boundingCoords: calcBoundingCoords(feature),
        },
      };
    }, {})
  );
}, {});
