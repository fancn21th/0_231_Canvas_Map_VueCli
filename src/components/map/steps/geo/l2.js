/* eslint-disable no-unused-vars */

import bgImg from "../../assets/bg.png";

// 倒数第二层的地图
export default {
  // 基础配置
  "S0.1": (preOption, { level }) => {
    return {
      show: true,
      silent: level > 2,
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
  "S1.1": (preOption, { level, name }) => {
    switch (level) {
      case 2:
        return {
          itemStyle: {
            color: {
              image: bgImg,
              repeat: "no-repeat",
            },
            borderWidth: 3,
            borderColor: "#fff",
          },
        };
      // 在第三层的时候，绘制相关城市背景
      case 3:
        return {
          itemStyle: {
            color: "transparent",
          },
          regions: [
            {
              name,
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

      default:
        return { itemStyle: { color: "transparent" } };
    }
  },
};
