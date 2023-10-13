import { calcBoundingCoords } from "../../utils";
import merge from "lodash/mergeWith";

import { china, hubei, wuhan, huangpi, shiyan, yichang } from "./nameMap";

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
