import { ref } from 'vue';
import { resolveNextOption } from '../steps';
import {
  layoutSize,
  layoutOriginCenter,
  layoutTargetCenter,
  layoutTargetOffsetCenter,
} from '../../../configs/mapConfig';

export const useOption = ({ coordsMap = {} }) => {
  const option = ref(null);
  const lastName = ref(null); // name 历史记录
  const actionHistory = ref({}); // action 历史记录

  const updateOption = (action) => {
    try {
      // 混合上次的操作 action
      const nextAction = {
        ...actionHistory.value,
        ...action,
      };

      const { name } = nextAction;

      // 记住上次的操作 action
      actionHistory.value = nextAction;

      if (!name) return; // 没有名字的 action 不更新

      lastName.value = name;

      // boundingCoords
      const { boundingCoords } = action;

      // children
      let children = null;

      // TODO: 可以不用写死, 目前方便理解
      if (name === '混合') {
        children = coordsMap['混合']?.children;
      }

      // 附加的 配置数据
      const extra = {
        parent: coordsMap[name]?.parent,
        children,
        level: coordsMap[name].level,
        // coordsMap,
        layoutSize,
        layoutOriginCenter,
        layoutTargetCenter,
        layoutTargetOffsetCenter,
        boundingCoords: boundingCoords ? boundingCoords : coordsMap[name].boundingCoords,
      };

      const nextActionWithMeta = {
        ...nextAction,
        ...extra,
      };

      console.log('地图调试数据', '--action--', action, nextAction, nextActionWithMeta);

      const nextOption = resolveNextOption(nextActionWithMeta);

      option.value = nextOption;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    option,
    lastName,
    updateOption,
    goUp: () => {
      const parent = coordsMap[lastName.value].parent;
      updateOption({
        name: parent,
      });
    },
    goMultiple: () => {
      updateOption({
        name: '混合',
      });
    },
  };
};
