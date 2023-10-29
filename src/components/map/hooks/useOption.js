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
  const nameHistory = ref(null); // name 历史记录
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

      nameHistory.value = name;

      // 附加的 配置数据
      const extra = {
        level: coordsMap[name].level, //
        coordsMap,
        layoutSize,
        layoutOriginCenter,
        layoutTargetCenter,
        layoutTargetOffsetCenter,
        boundingCoords: coordsMap[name].boundingCoords,
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
    updateOption,
    goUp: () => {
      const parent = coordsMap[nameHistory.value].parent;
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
