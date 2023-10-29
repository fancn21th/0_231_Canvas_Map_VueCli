/* eslint-disable no-unused-vars */
import bgImg from '../../assets/bg.png';

// TODO: 待提取
const shadowStyle = {
  shadowColor: '#0B7FD1',
  shadowBlur: 5,
  shadowOffsetX: 10,
  shadowOffsetY: 20,
};

// 第三层的地图
export default {
  // 基础配置
  'S0.1': (preOption, { name, level }) => {
    return {
      show: level >= 3,
      silent: level > 3,
      id: 'S3',
      zlevel: 3,
      roam: true,
      label: {
        normal: {
          show: true,
        },
      },
    };
  },
  // 地图层级
  'S0.2': (preOption, { boundingCoords, parent, name, level, layoutOriginCenter, animation, layoutSize }) => {
    return {
      map: level === 4 ? parent : name,
      boundingCoords,
      layoutCenter: animation?.layoutCenter || layoutOriginCenter,
      layoutSize,
    };
  },
  // 绘制背景/阴影
  'S1.1': (preOption, { level, name, selectedName }) => {
    switch (level) {
      case 3:
        return {
          itemStyle: {
            color: {
              image: bgImg,
              repeat: 'no-repeat',
            },
            borderWidth: 3,
            borderColor: '#fff',
          },
          regions: [
            {
              name: selectedName,
              selected: true,
            },
          ],
          select: {
            itemStyle: shadowStyle,
          },
        };
      // 在第四层的时候，绘制相关城市背景
      case 4:
        return {
          itemStyle: {
            color: 'transparent',
          },
          regions: [
            {
              name,
              selected: true,
            },
          ],
          select: {
            itemStyle: shadowStyle,
          },
        };

      default:
        return { itemStyle: { color: 'transparent' } };
    }
  },
};
