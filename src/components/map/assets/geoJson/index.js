import { calcBoundingCoords } from "../../utils";
import merge from "lodash/mergeWith";

import china from "./china.json";
import hubei from "./hubei.json";
import wuhan from "./city/武汉市.json";
import shiyan from "./city/十堰市.json";
import yichang from "./city/宜昌市.json";
import huangpi from "./county/黄陂区.json";

// 地图的字典
export const nameMap = {
  武汉市: "wuhan",
  十堰市: "shiyan",
  宜昌市: "yichang",
  黄陂区: "huangpi",
};

// 注册地图
export const registerMap = (echarts) => {
  if (!echarts) throw new Error("echarts is required");
  echarts.registerMap("china", china);
  echarts.registerMap("hubei", hubei);

  //  武汉市
  echarts.registerMap("wuhan", wuhan);
  echarts.registerMap("huangpi", huangpi);

  // 十堰市
  echarts.registerMap("shiyan", shiyan);

  // 宜昌市
  echarts.registerMap("yichang", yichang);
};

// areas
const areas = [china, hubei, wuhan, shiyan, yichang, huangpi];

// 坐标的字典
export const coordsMap = areas.reduce((acc, area) => {
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
