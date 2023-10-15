/* eslint-disable no-unused-vars */

import { l1, l2, l3, l4 } from "./geo";
import s from "./series";

const stepsForGeo = ["S0.1", "S0.2", "S1.1"];

export const stepsMapForGeo = {
  "S0.1": "基础配置",
  "S0.2": "地图层级",
  "S1.1": "绘制背景/阴影",
  "S1.2": "绘制边框",
  "S1.3": "绘制高亮",
};

const doNothing = (preOption, action) => {
  const nextOption = preOption;
  return nextOption;
};

const stepFuncsForGeo = {
  "S0.1": doNothing,
  "S0.2": doNothing,
  "S1.1": doNothing,
  "S1.2": doNothing,
  "S1.3": doNothing,
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

  console.log("resolve geo", nextGeo);

  return nextGeo;
};

const resolveSeries = (action) => {
  const nextSeries = {
    series: [...s(action)],
  };

  console.log("resolve series", nextSeries);

  return nextSeries;
};

export const resolveNextOption = (action) => {
  return {
    ...resolveGeo(action),
    ...resolveSeries(action),
  };
};
