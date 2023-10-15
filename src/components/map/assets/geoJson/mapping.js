import {
  china,
  hubei,
  wuhan,
  huangpi,
  shiyan,
  yichang,
  zigui,
  changyang,
  enshi,
  badong,
  shennongjia,
} from "./g";

import { getCoordsMap } from "./helper";

// name map
const nameMap = {
  中国: "china",
  湖北省: "hubei",
  // 武汉市
  武汉市: "wuhan",
  黄陂区: "huangpi",
  // 十堰市
  十堰市: "shiyan",
  // 宜昌市
  宜昌市: "yichang",
  秭归县: "zigui",
  长阳土家族自治县: "changyang",
  // 恩施
  恩施土家族苗族自治州: "enshi",
  巴东县: "badong",
  // 神农架
  神农架林区: "shennongjia",
};

// data map
const dataMap = {
  china,
  hubei,
  wuhan,
  huangpi,
  shiyan,
  yichang,
  zigui,
  changyang,
  enshi,
  badong,
  shennongjia,
};

// data name map
export const getDataNameMap = () => {
  const nameMap = getNameMap();
  return Object.keys(nameMap).reduce((acc, name) => {
    return {
      ...acc,
      [nameMap[name]]: name,
    };
  }, {});
};

const mixed = (names, option) => {
  return names.reduce((acc, name) => {
    const area = nameMap[name];
    const data = dataMap[area];

    const features = data.features || [];

    return {
      ...acc,
      features: acc.features.concat(features),
    };
  }, option);
};

export const mix1 = mixed(
  ["神农架林区", "秭归县", "长阳土家族自治县", "巴东县"],
  {
    type: "FeatureCollection",
    features: [],
  }
);

export const getNameMap = () => {
  return {
    ...nameMap,
    // 定制化
    混合: "mix1",
  };
};

export const getDataMap = () => {
  const combined = {
    ...dataMap,
    mix1,
  };

  return combined;
};

export const getCustomCoordsMap = () => {
  return getCoordsMap({
    customPropertiesMap: {
      混合: {
        properties: {
          name: "混合",
          adcode: "xx",
          parent: {
            adcode: 420000,
          },
        },
      },
    },
  });
};

export { registerMap } from "./helper";
