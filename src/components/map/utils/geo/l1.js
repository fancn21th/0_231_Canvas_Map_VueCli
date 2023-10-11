/* eslint-disable no-unused-vars */

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
      boundingCoords: coordsMap["湖北省"].boundingCoords,
    };
  },
  "L1.1": (preOption, action) => {
    return {
      ...preOption,
      itemStyle: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    };
  },
};
