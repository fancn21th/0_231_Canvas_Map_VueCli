/* eslint-disable no-unused-vars */

import bgImg from "../../assets/bg.png";

// 第三层的地图
export default {
  // 基础配置
  "S0.1": (preOption, { nameMap, name, level }) => {
    return {
      show: level >= 3,
      id: "S3",
      zlevel: 3,
      map: nameMap[name],
      roam: true,
      label: {
        normal: {
          show: true,
        },
      },
    };
  },
  // 地图层级
  "S0.2": (preOption, { coordsMap, name, level, nameMap }) => {
    return {
      map: level === 3 ? nameMap[name] : "wuhan",
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  // 绘制背景/阴影
  "S1.1": (preOption, { level, name }) => {
    switch (level) {
      case 3:
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

      case 4:
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
