/* eslint-disable no-unused-vars */

import bgImg from "../../assets/bg.png";

export default {
  "L0.1": (preOption, { coordsMap }) => {
    return {
      id: "L3",
      zlevel: 3,
      roam: true,
      map: "wuhan",
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
