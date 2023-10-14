import {
  china,
  hubei,
  wuhan,
  huangpi,
  shiyan,
  zigui,
  changyang,
  enshi,
  badong,
  shennongjia,
} from "./g";

// name map
export const nameMap = {
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
export const dataMap = {
  china,
  hubei,
  wuhan,
  huangpi,
  shiyan,
  zigui,
  changyang,
  enshi,
  badong,
  shennongjia,
};

const mixed = (names) => {
  return names.reduce(
    (acc, name) => {
      const area = nameMap[name];
      const data = dataMap[area];

      const features = data.features || [];
      return {
        ...acc,
        features: acc.features.concat(features),
      };
    },
    {
      features: [],
    }
  );
};

export const mix1 = mixed([
  "神农架林区",
  "秭归县",
  "长阳土家族自治县",
  "巴东县",
]);
