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

/**
 * 设计思想：
 *  1. geo 是弱业务部分，不需要关注业务，只需关注地图本身
 *  2. 4层地图 各司其职
 *
 */
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

/**
 * 设计思想：
 *  1. series 是强业务部分，需要关注业务，需要关注数据
 *  2. 接口的维度
 *    2.1 位置, geo 相关
 *    2.2 数据, 第 3 维度 前两个维度是经纬度
 *      2.2.1 自定义转换
 *    2.3 规则, 渲染规则
 *      2.3.1 到底配置放在外还是内部?
 *        2.3.1.1 先内部, 后外部, 相同内部, 不同外部 (发现个性化的配置就放到外部)
 *

    案例a:
      api result:
      [
        ['county', '项目数', '总金额'],
        ['宜昌市', '16', '900.00'],
        ['武汉市', '13', '700.00'],
        ['孝感市', '12', '720.00'],
        ['十堰市', '9', '700.00'],
      ]
      expected:
      [
        ['name', 'geo', '项目数', '总金额'],
        ['宜昌市', ['111.270590', '32.751992'], '16', '900.00'],
        ['武汉市', ['111.270590', '32.751992'], '13', '700.00'],
        ['孝感市', ['111.270590', '32.751992'], '12', '720.00'],
        ['十堰市', ['111.270590', '32.751992'],  '9', '700.00'],
      ]
    案例b:
 *
 */
const resolveSeries = (action) => {
  const { datasetType } = action;

  let nextSeries = null;

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
  const { dataset } = action;

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
  };

  console.log('地图调试数据', 'resolve next option', nextOption);

  return nextOption;
};
