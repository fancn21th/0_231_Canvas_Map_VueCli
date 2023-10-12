/* eslint-disable no-unused-vars */

// 最底层的地图
export default {
  "L0.1": (preOption, { coordsMap }) => {
    return {
      id: "L1",
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
  "L0.2": (preOption, { coordsMap, name }) => {
    return {
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  "L1.1": (preOption, action) => {
    return {
      itemStyle: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    };
  },
};
