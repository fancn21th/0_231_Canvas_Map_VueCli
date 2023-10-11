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
import bgImg from "../assets/bg.png";

const stepsToRun = ["L0.1", "L1.1"];

export const stepsMap = {
  "L0.1": "基础配置",
  "L1.1": "绘制背景",
  "L1.2": "绘制阴影",
  "L1.3": "绘制边框",
};

const stepFuncsForGeo = {
  "L0.1": (preOption, action) => {
    const nextOption = preOption;
    return nextOption;
  },
  "L1.1": (preOption, action) => {
    const nextOption = preOption;
    return nextOption;
  },
  "L1.2": (preOption, action) => {
    const nextOption = preOption;
    return nextOption;
  },
  "L1.3": (preOption, action) => {
    const nextOption = preOption;
    return nextOption;
  },
};

const specificStepFuncsForGeo = {
  l1: {
    "L0.1": (preOption, { coordsMap }) => {
      return {
        id: "L1",
        zlevel: 1,
        roam: true,
        map: "china",
        label: {
          normal: {
            show: true,
          },
        },
        boundingCoords: coordsMap["湖北省"].boundingCoords,
      };
    },
    "L1.1": (preOption, action) => {
      return {
        ...preOption,
        itemStyle: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      };
    },
  },
  l2: {
    "L0.1": (preOption, { coordsMap }) => {
      return {
        id: "L2",
        zlevel: 2,
        roam: true,
        map: "hubei",
        label: {
          normal: {
            show: true,
          },
        },
        boundingCoords: coordsMap["湖北省"].boundingCoords,
      };
    },
    "L1.1": (preOption, action) => {
      return {
        ...preOption,
        itemStyle: {
          color: {
            image: bgImg,
            repeat: "no-repeat",
          },
          borderWidth: 3,
          borderColor: "#fff",
          opacity: 0.5,
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowBlur: 10,
          shadowOffsetX: 15,
          shadowOffsetY: 15,
        },
      };
    },
  },
  l3: {
    "L0.1": (preOption, { coordsMap }) => {
      return {
        id: "L3",
        zlevel: 3,
        roam: true,
        map: "wuhan",
        label: {
          normal: {
            show: true,
          },
        },
        boundingCoords: coordsMap["湖北省"].boundingCoords,
      };
    },
    "L1.1": (preOption, action) => {
      return {
        ...preOption,
        itemStyle: {
          color: {
            image: bgImg,
            repeat: "no-repeat",
          },
          borderWidth: 3,
          borderColor: "#fff",
          opacity: 0.5,
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowBlur: 10,
          shadowOffsetX: 15,
          shadowOffsetY: 15,
        },
      };
    },
  },
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

const runSteps = (stepFuncs, action) => {
  return stepsToRun.reduce((preOption, stepFuncName) => {
    const stepFunc = stepFuncs[stepFuncName];
    const nextOption = stepFunc(preOption, action);
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
