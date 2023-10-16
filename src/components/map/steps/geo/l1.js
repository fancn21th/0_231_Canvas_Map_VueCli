/* eslint-disable no-unused-vars */
import bgImg from "../../assets/bg.png";

// 最底层的地图
export default {
  // 基础配置
  "S0.1": (preOption, { name, level }) => {
    return {
      show: true,
      silent: true,
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
  // 地图层级
  "S0.2": (preOption, { coordsMap, name }) => {
    return {
      boundingCoords: coordsMap[name].boundingCoords,
    };
  },
  // 绘制背景/阴影
  "S1.1": (preOption, { level, name }) => {
    switch (level) {
      // 在第二层的时候，绘制湖北省背景
      case 2:
        return {
          itemStyle: {
            color: "transparent",
          },
          regions: [
            {
              name,
              selected: true,
            },
          ],
          select: {
            itemStyle: {
              shadowColor: "rgba(0, 0, 0, .5)",
              shadowBlur: 10,
              shadowOffsetX: 10,
              shadowOffsetY: 20,
            },
          },
        };

      default:
        return {
          itemStyle: {
            color: "transparent",
          },
        };
    }
  },
};
