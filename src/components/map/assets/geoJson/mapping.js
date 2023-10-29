// 本文件是辅助方法, 不直接暴露给外部使用 !!!
import { dataMap } from './m';

// 定制化 dataMap
// data map ===> customized data map ==> coords map (remove features, add boundingCoords)

// properties 处理
// propertiesMap 是算法的辅助数据结构 建立 区域 name 到 properties 的映射
const propertiesMap = {};

Object.keys(dataMap).forEach((areaName) => {
  if (dataMap[areaName]) {
    dataMap[areaName].features.forEach(({ properties }) => {
      propertiesMap[properties.name] = properties;
    });
  }
});

Object.keys(dataMap).forEach((areaName) => {
  if (dataMap[areaName]) {
    dataMap[areaName].properties = propertiesMap[areaName];
  }
});

const mixed = (names, option) => {
  return names.reduce((acc, name) => {
    const data = dataMap[name];

    const features = data.features || [];

    return {
      ...acc,
      features: acc.features.concat(features),
      children: names,
    };
  }, option);
};

dataMap['混合'] = mixed(['神农架', '秭归县', '长阳县', '巴东县'], {
  type: 'FeatureCollection',
  features: [],
  // TODO: 数据结构并不一致 这是 workaround 方案
  properties: {
    name: '混合',
    adcode: '混合haha',
    parent: {
      adcode: 420000, // 需要正确设置父级 adcode
    },
  },
});

dataMap['湖北省2'] = mixed(['湖北省', '秭归县', '长阳县', '巴东县'], {
  type: 'FeatureCollection',
  features: [],
  // TODO: 数据结构并不一致 这是 workaround 方案
  properties: {
    name: '湖北省2',
    adcode: '湖北省2yoyo',
    parent: {
      adcode: 100000, // 需要正确设置父级 adcode
    },
  },
});

export const getDataMap = () => {
  // console.log('地图调试数据', 'data map', dataMap);
  return dataMap;
};
