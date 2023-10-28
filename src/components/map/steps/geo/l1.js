/* eslint-disable no-unused-vars */
import { layoutSize, layoutCenter, offsetLayoutCenter } from '../../../../configs/mapConfig';

// 最底层的地图
export default {
  // 基础配置
  'S0.1': (preOption, { name, level }) => {
    return {
      show: true,
      silent: true,
      id: 'S1',
      zlevel: 1,
      roam: true,
      label: {
        normal: {
          show: true,
        },
      },
    };
  },
  // 地图层级
  'S0.2': (preOption, { coordsMap, name, level }) => {
    const resolvedLayoutCenter = level === 2 ? offsetLayoutCenter : layoutCenter;
    return {
      map: '中国',
      boundingCoords: coordsMap[name].boundingCoords,
      layoutCenter: resolvedLayoutCenter,
      layoutSize,
    };
  },
  // 绘制背景/阴影
  'S1.1': (preOption, { level, name }) => {
    switch (level) {
      // 在第二层的时候，绘制湖北省背景
      case 2:
        return {
          itemStyle: {
            color: 'transparent',
            borderColor: '#414753', // 边界颜色,
            borderWidth: 2,
          },
          regions: [
            {
              name,
              selected: true,
            },
          ],
          select: {
            itemStyle: {
              shadowColor: '#0B7FD1',
              shadowBlur: 5,
              shadowOffsetX: 10,
              shadowOffsetY: 20,
            },
          },
        };

      default:
        return {
          itemStyle: {
            color: 'transparent',
          },
        };
    }
  },
};
