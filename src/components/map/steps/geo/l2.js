/* eslint-disable no-unused-vars */

import bgImg from "../../assets/bg.png";

// 倒数第二层的地图
export default {
  // 基础配置
  "S0.1": (preOption, { coordsMap }) => {
    return {
      show: true,
      id: "S2",
      zlevel: 2,
      roam: true,
      map: "hubei",
      label: {
        normal: {
          show: true,
        },
      },
    };
  },
  // 地图层级
  "S0.2": (preOption, { coordsMap, name }) => {
    return {
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  // 绘制背景/阴影
  "S1.1": (preOption, { level }) => {
    return {
      itemStyle: {
        ...(level === 2
          ? {
              color: {
                image: bgImg,
                repeat: "no-repeat",
              },
              borderWidth: 3,
              borderColor: "#fff",
            }
          : {
              color: "rgba(0, 0, 0, 0.1)",
            }),
      },
    };
  },
};
