import zip from 'lodash/zip';

function getPieOption({ center, name, data }) {
  return {
    type: 'pie',
    coordinateSystem: 'geo',
    tooltip: {
      formatter: '{a}:{b}:{c}',
    },
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
    animationDuration: 0,
    radius: 20,
    center,
    zlevel: 5,
    name,
    data,
  };
}

export default ({ coordsMap, dataset }) => {
  // 反转数据
  const zipDataset = zip(...dataset);

  // 去掉第一列
  const pie = zipDataset[0].slice(1).map((name) => {
    const area = coordsMap[name];
    const center = area.properties?.centroid;

    const columnIndex = zipDataset[0].indexOf(name);

    // 去掉第一行
    const data = zipDataset.slice(1).map((item) => {
      return {
        name: item[0],
        value: item[columnIndex],
      };
    });

    return getPieOption({ center, name, data });
  });

  console.log('地图调试数据', 'pie', pie);

  return pie;
};
