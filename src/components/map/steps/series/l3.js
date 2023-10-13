/* eslint-disable no-unused-vars */

import bgImg from "../../assets/bg.png";

// 第三层的地图
export default {
  "S0.1": (preOption, { nameMap, name, level }) => {
    return {
      show: level >= 3,
      id: "S3",
      zlevel: 3,
      roam: true,
      label: {
        normal: {
          show: true,
        },
      },
    };
  },
  "S0.2": (preOption, { coordsMap, name, level, nameMap }) => {
    return {
      map: level === 3 ? nameMap[name] : "wuhan",
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  "S1.1": (preOption, { level }) => {
    return {
      itemStyle: {
        ...(level === 3
          ? {
              color: {
                image: bgImg,
                repeat: "no-repeat",
              },
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 10,
              shadowOffsetX: 15,
              shadowOffsetY: 15,
              borderWidth: 3,
              borderColor: "#fff",
              opacity: 0.5,
            }
          : {
              color: "rgba(0, 0, 0, 0.1)",
            }),
      },
    };
  },
};
