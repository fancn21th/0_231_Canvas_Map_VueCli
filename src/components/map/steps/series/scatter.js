function getOption({ name, data, option }) {
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
        return value[2][option.label];
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

/**
  expected:
      [
        ['name', 'geo', '项目数', '总金额'],
        ['宜昌市', ['111.270590', '32.751992'], '16', '900.00'],
        ['武汉市', ['111.270590', '32.751992'], '13', '700.00'],
        ['孝感市', ['111.270590', '32.751992'], '12', '720.00'],
        ['十堰市', ['111.270590', '32.751992'],  '9', '700.00'],
      ]

  converted:
      [
        {
          name: '宜昌市',
          value: ['111.270590', '32.751992', { '项目数': '16', '总金额': '900.00' }],
        }
      ]
 */

const resolveOne = (dataset, name, option) => {
  const data = dataset.slice(1).map((row) => {
    const [name, geo, ...rest] = row;
    const obj = rest.reduce((acc, item, index) => {
      const key = dataset[0][index + 2];
      return {
        ...acc,
        [key]: item,
      };
    }, {});

    return {
      name,
      value: [...geo, obj],
    };
  });
  const options = getOption({ name, data, option });
  return options;
};

const isMultiple = (dataset) => {
  return Array.isArray(dataset[0]?.[0]);
};

export default ({ option }) => {
  const { data, series } = option;
  if (isMultiple(data)) {
    const options = data.map((item, index) => {
      const name = series[index] || `无名${index}`;
      return resolveOne(item, name, option);
    });
    return options;
  }
  const options = resolveOne(data, series[0], option);
  return [options];
};
