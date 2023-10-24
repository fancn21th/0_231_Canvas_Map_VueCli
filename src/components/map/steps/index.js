/* eslint-disable no-unused-vars */

import { l1, l2, l3, l4 } from './geo';
import { pie, scatter } from './series';

const stepsForGeo = ['S0.1', 'S0.2', 'S1.1'];

export const stepsMapForGeo = {
  'S0.1': '基础配置',
  'S0.2': '地图层级',
  'S1.1': '绘制背景/阴影',
  'S1.2': '绘制边框',
  'S1.3': '绘制高亮',
};

const doNothing = (preOption, action) => {
  const nextOption = preOption;
  return nextOption;
};

const stepFuncsForGeo = {
  'S0.1': doNothing,
  'S0.2': doNothing,
  'S1.1': doNothing,
  'S1.2': doNothing,
  'S1.3': doNothing,
};

const stepFuncsForGeoL1 = {
  ...stepFuncsForGeo,
  ...l1,
};

const stepFuncsForGeoL2 = {
  ...stepFuncsForGeo,
  ...l2,
};

const stepFuncsForGeoL3 = {
  ...stepFuncsForGeo,
  ...l3,
};

const stepFuncsForGeoL4 = {
  ...stepFuncsForGeo,
  ...l4,
};

const runSteps = (steps, stepFuncs, action) => {
  return steps.reduce((preOption, stepFuncName) => {
    const stepFunc = stepFuncs[stepFuncName];

    const partOfNextOption = stepFunc(preOption, action);

    const nextOption = {
      ...preOption,
      ...partOfNextOption,
    };

    return nextOption;
  }, {});
};

const resolveGeo = (action) => {
  const nextGeo = {
    geo: [
      runSteps(stepsForGeo, stepFuncsForGeoL1, action),
      runSteps(stepsForGeo, stepFuncsForGeoL2, action),
      runSteps(stepsForGeo, stepFuncsForGeoL3, action),
      runSteps(stepsForGeo, stepFuncsForGeoL4, action),
    ],
  };

  return nextGeo;
};

const resolveSeries = (action) => {
  const { datasetType } = action;

  let nextSeries = null;

  // 支持一种类型的图表
  switch (datasetType) {
    case 'pie':
      nextSeries = { series: [...pie(action)] };
      break;
    case 'scatter':
      nextSeries = { series: [...scatter(action)] };
      break;
    default:
      throw new Error(`不支持的图表类型: ${datasetType}`);
  }

  return nextSeries;
};

export const resolveNextOption = (action) => {
  const { dataset, pos } = action;

  const nextOption = {
    tooltip: {},
    legend: {},
    ...resolveGeo(action),
    ...(dataset
      ? {
          dataset: {
            source: dataset,
          },
        }
      : {}),
    ...(dataset ? resolveSeries(action) : {}),
    ...(pos
      ? {
          graphic: [
            {
              type: 'rect',
              shape: {
                x: pos[0], // 矩形左上角 x 坐标
                y: pos[1], // 矩形左上角 y 坐标
                width: 20, // 矩形宽度
                height: 80, // 矩形高度
              },
              style: {
                fill: 'red', // 矩形填充颜色
              },
              zlevel: 100,
            },
            {
              type: 'rect',
              shape: {
                x: pos[0] + 25, // 矩形左上角 x 坐标
                y: pos[1], // 矩形左上角 y 坐标
                width: 20, // 矩形宽度
                height: 80, // 矩形高度
              },
              style: {
                fill: 'green', // 矩形填充颜色
              },
              zlevel: 100,
            },
          ],
        }
      : {}),
  };

  console.log('地图调试数据', 'resolve next option', nextOption);

  return nextOption;
};
