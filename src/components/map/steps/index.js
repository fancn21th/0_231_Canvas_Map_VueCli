/* eslint-disable no-unused-vars */

// 1. 能够显示 省市县地图  以及 若干个区域组成的区域
//    1.1 当前层级的背景
//    1.2 高亮 ( Hover )
//    1.3 若干个区域 选中其中一个 只能单选
//    1.4 shadow
//    1.5 区域 border

// 2. 市和县一级能够拖动切换 到 同级其他区域
// 3. 部分业务模块 需要在每一级地图 有 柱状图 / 或者 圆点
// 4. 当全局的过滤条件 (年份) 发生变化, 地图内的 图表数据也发生变化
// 5. 动画

import l1 from "./geo/l1";
import l2 from "./geo/l2";
import l3 from "./geo/l3";

const stepsToRun = ["L0.1", "L1.1"];

export const stepsMap = {
  "L0.1": "基础配置",
  "L1.1": "绘制背景",
  "L1.2": "绘制阴影",
  "L1.3": "绘制边框",
  "L1.4": "绘制高亮",
};

const donone = (preOption, action) => {
  const nextOption = preOption;
  return nextOption;
};

const stepFuncsForGeo = {
  "L0.1": donone,
  "L1.1": donone,
  "L1.2": donone,
  "L1.3": donone,
};

const specificStepFuncsForGeo = {
  l1,
  l2,
  l3,
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

const debugge = (stepFuncName, title, pack) => {
  console.log(stepFuncName, title, pack);
};

const runSteps = (stepFuncs, action) => {
  return stepsToRun.reduce((preOption, stepFuncName) => {
    debugge(stepsMap[stepFuncName], "执行前", { action, preOption });

    const stepFunc = stepFuncs[stepFuncName];
    const nextOption = stepFunc(preOption, action);

    debugge(stepsMap[stepFuncName], "执行后", {
      action,
      preOption,
      nextOption,
    });
    return nextOption;
  }, {});
};

const resolveGeo = (action) => {
  return {
    geo: [
      runSteps(stepFuncsForGeoL1, action),
      runSteps(stepFuncsForGeoL2, action),
      runSteps(stepFuncsForGeoL3, action),
    ],
  };
};

export const resolveNextOption = (action) => {
  return resolveGeo(action);
};
