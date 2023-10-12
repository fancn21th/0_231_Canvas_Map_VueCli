/* eslint-disable no-unused-vars */

import bgImg from "../../assets/bg.png";

// 倒数第二层的地图
export default {
  "L0.1": (preOption, { coordsMap }) => {
    return {
      id: "L2",
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
  "L0.2": (preOption, { coordsMap, name }) => {
    return {
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  "L1.1": (preOption, action) => {
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
