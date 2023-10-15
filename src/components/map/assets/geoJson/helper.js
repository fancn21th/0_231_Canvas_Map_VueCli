import { calcBoundingCoords } from "../../utils";

import { getDataMap, getDataNameMap } from "./mapping";

// 本文件是辅助方法, 不直接暴露给外部使用

// 注册地图
export const registerMap = (echarts) => {
  if (!echarts) throw new Error("echarts is required");

  const dataMap = getDataMap();

  // console.log("注册地图", dataMap);

  Object.keys(dataMap).forEach((name) => {
    echarts.registerMap(name, dataMap[name]);
  });
};

// 坐标边界 映射
export const getCoordsMap = ({ customPropertiesMap = {} }) => {
  const dataMap = getDataMap();
  const dataNameMap = getDataNameMap();

  // propertiesMap 是算法的辅助数据结构 建立 区域 name 到 properties 的映射
  const propertiesMap = {
    ...customPropertiesMap,
  };

  // 处理边界
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

    // 把 data map 装换成 中文名为 key 的 map
    return {
      ...acc,
      [name]: {
        boundingCoords: calcBoundingCoords(concatCoords),
      },
    };
  }, {});

  // 处理 properties
  coordsMap = Object.keys(coordsMap).reduce((acc, name) => {
    return {
      ...acc,
      [name]: {
        ...coordsMap[name],
        ...propertiesMap[name],
      },
    };
  }, {});

  // 处理层级关系
  const temp = Object.keys(coordsMap).reduce((acc, name) => {
    const coordsItem = coordsMap[name];
    const adcode = coordsItem?.properties?.adcode || "";

    return {
      ...acc,
      [adcode]: {
        ...coordsItem,
        name: coordsItem?.properties?.name,
        adcode: coordsItem?.properties?.adcode,
        parent: coordsItem?.properties?.parent?.adcode,
        ref: coordsItem,
      },
    };
  }, {});

  const getLevel = (item) => {
    const parent = temp[item.parent];
    if (!parent) return 2;
    if (parent.level) return parent.level + 1;
    return getLevel(parent) + 1;
  };

  Object.keys(temp).forEach((adcode) => {
    const item = temp[adcode];
    item.level = getLevel(item);
    // 通过应用 设置层级关系
    item.ref.level = item.level;
    const parent = temp[item.parent];
    item.ref.parent = parent?.name;
  });

  console.log("coordsMap", coordsMap);

  return coordsMap;
};
