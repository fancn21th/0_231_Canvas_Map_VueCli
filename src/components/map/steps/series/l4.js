/* eslint-disable no-unused-vars */

import bgImg from "../../assets/bg.png";

// 最顶层的地图
export default {
  "S0.1": (preOption, { nameMap, name, level }) => {
    return {
      show: level === 4,
      id: "S4",
      zlevel: 4,
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
      map: level === 4 ? nameMap[name] : "huangpi",
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  "S1.1": (preOption, action) => {
    return {
      itemStyle: {
        color: {
          image: bgImg,
          repeat: "no-repeat",
        },
        borderWidth: 3,
        borderColor: "#fff",
        opacity: 0.5,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowBlur: 10,
        shadowOffsetX: 15,
        shadowOffsetY: 15,
      },
    };
  },
};
