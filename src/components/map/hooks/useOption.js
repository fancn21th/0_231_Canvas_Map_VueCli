import { ref } from "vue";
import { resolveNextOption } from "../steps";

export const useOption = ({ coordsMap = {}, nameMap = {} }) => {
  const option = ref(null);
  const history = ref({});
  const currentLevel = ref(2);

  const updateOption = (action) => {
    const { level, name } = action;

    history.value[level] = name;

    currentLevel.value = level;

    const nextOption = resolveNextOption({
      ...action,
      coordsMap,
      nameMap,
    });
    option.value = nextOption;
  };

  return {
    option,
    updateOption,
    goUp: () => {
      const next = history.value[currentLevel.value - 1];
      next &&
        updateOption({
          level: currentLevel.value - 1,
          name: next,
        });
    },
    goDown: () => {
      const next = history.value[currentLevel.value + 1];
      next &&
        updateOption({
          level: currentLevel.value + 1,
          name: next,
        });
    },
  };
};
