import { calcBoundingCoords } from "../../utils";

import { getDataMap, getDataNameMap } from "./mapping";

// 注册地图
export const registerMap = (echarts) => {
  if (!echarts) throw new Error("echarts is required");

  const dataMap = getDataMap();

  console.log("注册地图", dataMap);

  Object.keys(dataMap).forEach((name) => {
    echarts.registerMap(name, dataMap[name]);
  });
};

// 坐标边界 映射
export const getCoordsMap = () => {
  const dataMap = getDataMap();
  const dataNameMap = getDataNameMap();
  const propertiesMap = {};

  let coordsMap = Object.keys(dataMap).reduce((acc, areaName) => {
    const area = dataMap[areaName];
    const name = dataNameMap[areaName];
    let concatCoords = [];

    area.features.forEach((feature) => {
      const {
        properties,
        geometry: { coordinates },
      } = feature;
      propertiesMap[properties.name] = {
        properties,
      };
      concatCoords = concatCoords.concat(coordinates);
    });

    return {
      ...acc,
      [name]: {
        boundingCoords: calcBoundingCoords(concatCoords),
      },
    };
  }, {});

  coordsMap = Object.keys(coordsMap).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        ...coordsMap[name],
        ...propertiesMap[name],
      },
    };
  }, {});

  console.log("坐标边界字典", dataMap, dataNameMap, coordsMap);

  return coordsMap;
};
