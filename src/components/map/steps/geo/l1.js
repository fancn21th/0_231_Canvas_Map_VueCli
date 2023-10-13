/* eslint-disable no-unused-vars */
import bgImg from "../../assets/bg.png";

// 最底层的地图
export default {
  "S0.1": (preOption, { coordsMap }) => {
    return {
      id: "S1",
      zlevel: 1,
      roam: true,
      map: "china",
      label: {
        normal: {
          show: true,
        },
      },
    };
  },
  "S0.2": (preOption, { coordsMap, name }) => {
    return {
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  "S1.1": (preOption, action) => {
    return {
      itemStyle: {
        color: "transparent",
      },
      regions: [
        {
          name: "湖北省",
          selected: true,
          color: {
            image: bgImg,
            repeat: "no-repeat",
          },
          itemStyle: {
            shadowColor: "rgba(0, 0, 0, .5)",
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 20,
          },
        },
      ],
    };
  },
};
