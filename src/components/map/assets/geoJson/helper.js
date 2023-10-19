import { calcBoundingCoords } from '../../utils';
import { getDataMap } from './mapping';

// 注册地图
export const registerMap = (echarts) => {
  if (!echarts) throw new Error('echarts is required');

  const dataMap = getDataMap();

  Object.keys(dataMap).forEach((name) => {
    echarts.registerMap(name, dataMap[name]);
  });
};

// data map 的 派生状态 去掉了 features 补充了 boundingCoords
export const getCoordsMap = () => {
  const dataMap = getDataMap();

  const initialCoordsMap = {};

  // 处理 boundingCoords
  let coordsMap = Object.keys(dataMap).reduce((acc, areaName) => {
    const areaData = dataMap[areaName];
    let concatCoords = [];

    areaData.features.forEach((feature) => {
      const {
        geometry: { coordinates },
      } = feature;
      concatCoords = concatCoords.concat(coordinates);
    });

    return {
      ...acc,
      [areaName]: {
        boundingCoords: calcBoundingCoords(concatCoords),
        properties: areaData.properties,
        children: areaData.children,
      },
    };
  }, initialCoordsMap);

  // 处理层级关系 依赖于 properties
  const temp = Object.keys(coordsMap).reduce((acc, name) => {
    const coordsItem = coordsMap[name];
    const adcode = coordsItem?.properties?.adcode || '';

    return {
      ...acc,
      [adcode]: {
        ...coordsItem,
        // 提升一系列的属性
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

  console.log('地图调试数据', 'coordsMap', coordsMap);

  return coordsMap;
};
