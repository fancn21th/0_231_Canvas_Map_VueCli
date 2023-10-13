/* eslint-disable no-unused-vars */

import l1 from "./geo/l1";
import l2 from "./geo/l2";
import l3 from "./geo/l3";
import l4 from "./geo/l4";

// // utils
// const memo = (func) => (preOption, action) => {
//   const memoMap = new Map();

//   const runFunc = () => {
//     if (memoMap.has(action)) {
//       console.log("memo 命中", action);
//       return memoMap.get(action);
//     }
//     const result = func(preOption, action);
//     memoMap.set(action, result);
//     return result;
//   };

//   return runFunc();
// };

// const memorize = (funcObject) => {
//   return Object.keys(funcObject).reduce((pre, key) => {
//     const func = funcObject[key];
//     pre[key] = memo(func);
//     return pre;
//   }, {});
// };
// // utils ends

const stepsForGeo = ["S0.1", "S0.2", "S1.1"];

export const stepsMapForGeo = {
  "S0.1": "基础配置",
  "S0.2": "地图层级",
  "S1.1": "绘制背景",
  "S1.2": "绘制阴影",
  "S1.3": "绘制边框",
  "S1.4": "绘制高亮",
};

const donone = (preOption, action) => {
  const nextOption = preOption;
  return nextOption;
};

const stepFuncsForGeo = {
  "S0.1": donone,
  "S0.2": donone,
  "S1.1": donone,
  "S1.2": donone,
  "S1.3": donone,
};

const specificStepFuncsForGeo = {
  l1,
  l2,
  l3,
  l4,
};

const stepFuncsForGeoL1 = {
  ...stepFuncsForGeo,
  ...specificStepFuncsForGeo.l1,
};

const stepFuncsForGeoL2 = {
  ...stepFuncsForGeo,
  ...specificStepFuncsForGeo.l2,
};

const stepFuncsForGeoL3 = {
  ...stepFuncsForGeo,
  ...specificStepFuncsForGeo.l3,
};

const stepFuncsForGeoL4 = {
  ...stepFuncsForGeo,
  ...specificStepFuncsForGeo.l4,
};

const debugge = (stepFuncName, title, pack) => {
  console.log(stepFuncName, title, pack);
};

const runSteps = (steps, stepFuncs, action) => {
  return steps.reduce((preOption, stepFuncName) => {
    // debugge(stepsMapForGeo[stepFuncName], "before runSteps", {
    //   action,
    //   preOption,
    // });

    const stepFunc = stepFuncs[stepFuncName];

    const partOfNextOption = stepFunc(preOption, action);

    const nextOption = {
      ...preOption,
      ...partOfNextOption,
    };

    // debugge(stepsMapForGeo[stepFuncName], "after runSteps", {
    //   action,
    //   preOption,
    //   partOfNextOption,
    //   nextOption,
    // });
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

  debugge("resolve geo", "resolve geo", nextGeo);

  return nextGeo;
};

const resolveSeries = () => {
  return {
    series: [],
  };
};

export const resolveNextOption = (action) => {
  return {
    ...resolveGeo(action),
    ...resolveSeries(action),
  };
};
