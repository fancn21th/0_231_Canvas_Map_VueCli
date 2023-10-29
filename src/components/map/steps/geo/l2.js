/* eslint-disable no-unused-vars */
import bgImg from '../../assets/bg.png';

// 倒数第二层的地图
export default {
  // 基础配置
  'S0.1': (preOption, { level }) => {
    return {
      show: true,
      silent: level > 2,
      id: 'S2',
      zlevel: 2,
      roam: true,
      label: {
        normal: {
          show: true,
        },
      },
    };
  },
  // 地图层级
  'S0.2': (preOption, { boundingCoords, name, animation, layoutSize, layoutOriginCenter }) => {
    // const resolvedLayoutCenter = level === 3 ? layoutTargetOffsetCenter : layoutTargetCenter;
    return {
      map: name === '混合' ? '湖北省2' : '湖北省',
      boundingCoords,
      layoutCenter: animation?.layoutCenter || layoutOriginCenter,
      layoutSize,
    };
  },
  // 绘制背景/阴影
  'S1.1': (preOption, { level, name, children }) => {
    switch (level) {
      case 2:
        return {
          itemStyle: {
            color: {
              image: bgImg,
              repeat: 'no-repeat',
            },
            borderWidth: 3,
            borderColor: '#fff',
          },
        };
      // 在第三层的时候，绘制相关城市背景
      case 3:
        return {
          itemStyle: {
            color: 'transparent',
            borderColor: '#414753', // 边界颜色,
            borderWidth: 2,
          },
          regions: children
            ? [...children.map((name) => ({ name, selected: true }))]
            : [
                {
                  name,
                  selected: true,
                },
              ],
          select: {
            itemStyle: {
              // color: 'rgb(138,203,255, 0.66)',
              shadowColor: '#0B7FD1',
              shadowBlur: 5,
              shadowOffsetX: 10,
              shadowOffsetY: 20,
            },
          },
        };

      default:
        return { itemStyle: { color: 'transparent' } };
    }
  },
};
