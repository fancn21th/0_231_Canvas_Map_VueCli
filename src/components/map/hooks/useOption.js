import { ref } from 'vue';
import { resolveNextOption } from '../steps';

export const useOption = ({ coordsMap = {} }) => {
  const option = ref(null);
  const history = ref(null);

  const updateOption = (action) => {
    try {
      const { name } = action;

      if (!name) return;

      history.value = name;

      const level = coordsMap[name].level;

      const nextAction = {
        ...action,
        level,
        coordsMap,
      };

      console.log('地图调试数据', 'action', nextAction);

      const nextOption = resolveNextOption(nextAction);

      option.value = nextOption;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    option,
    updateOption,
    goUp: () => {
      const parent = coordsMap[history.value].parent;
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
