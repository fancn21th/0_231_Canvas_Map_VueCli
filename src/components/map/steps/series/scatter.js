import zip from 'lodash/zip';

function getOption({ name, data }) {
  return {
    type: 'scatter',
    coordinateSystem: 'geo',
    tooltip: {
      formatter: (params) => {
        const obj = params.value[2];
        const text = Object.keys(obj)
          .reduce((acc, key) => {
            return acc.concat(`${key}:${obj[key]}`);
          }, [])
          .join(',');
        return text;
      },
    },
    symbolSize: 30,
    label: {
      formatter: ({ value }) => {
        return value[2]['项目数'];
      },
      position: 'inside',
      show: true,
    },
    labelLine: {
      show: false,
    },
    animationDuration: 0,
    zlevel: 5,
    name,
    data,
  };
}

export default ({ coordsMap, dataset }) => {
  // 反转数据
  const zipDataset = zip(...dataset);

  console.log({ zipDataset });

  // 去掉第一列
  const data = zipDataset[0].slice(1).map((name) => {
    const area = coordsMap[name];
    const center = area.properties?.centroid;

    const columnIndex = zipDataset[0].indexOf(name);

    // 去掉第一行
    const data = zipDataset.slice(1).reduce((acc, item) => {
      return {
        ...acc,
        [item[0]]: item[columnIndex],
      };
    }, {});

    return {
      name,
      value: center.concat([data]),
    };
  });

  console.log('地图调试数据', 'scatter', data);

  const option = getOption({ data });

  return [option];
};
