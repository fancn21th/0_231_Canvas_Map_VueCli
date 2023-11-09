/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import max from 'lodash/max';

const barWidth = 20;
const scaleX = 0.75;

const getScale = (array, range = 100) => {
  const maxValue = max(array);
  return range / maxValue;
};

function getOption({ name, data, index }) {
  const scaleY = getScale(
    data.map((item) => {
      const [k, v] = Object.entries(item.value[2])[0];
      return parseInt(v);
    }),
    100 + index * 100,
  );

  console.log('scaleY', scaleY);

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
    symbol: 'rect',
    symbolSize: (value, params) => {
      const data = value[2];
      const [k, v] = Object.entries(data)[0];
      return [barWidth, parseInt(v) * scaleY];
    },
    symbolOffset: (value, params) => {
      const data = value[2];
      const [k, v] = Object.entries(data)[0];
      const offsetX = index === 0 ? -barWidth * scaleX : barWidth * scaleX;
      const offsetY = -((parseInt(v) * scaleY) / 2) - 10;
      return [offsetX, offsetY];
    },
    label: {
      formatter: ({ value }) => {
        return value[2][name];
      },
      position: 'top',
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

const resolveOne = (dataset, name, index = 0) => {
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
  const options = getOption({ name, data, index });
  return options;
};

const isMultiple = (dataset) => {
  return Array.isArray(dataset[0]?.[0]);
};

export default ({ option }) => {
  const { data } = option;
  if (isMultiple(data)) {
    const options = data.map((item, index) => {
      const firstRow = item[0];
      const name = firstRow[firstRow.length - 1];
      const seriesItem = resolveOne(item, name, index);
      return seriesItem;
    });
    return options;
  }
  const firstRow = data[0];
  const name = firstRow[firstRow.length - 1];
  const options = resolveOne(data, name);
  return [options];
};
