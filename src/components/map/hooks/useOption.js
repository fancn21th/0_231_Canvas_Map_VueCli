import { ref } from "vue";
import { resolveNextOption } from "../steps";

export const useOption = ({ coordsMap = {}, nameMap = {} }) => {
  const option = ref(null);
  const history = ref({});
  const currentLevel = ref(2);

  const updateOption = (action) => {
    console.log("action", action);

    try {
      const { level, name } = action;

      history.value[level] = name;

      currentLevel.value = level;

      const nextOption = resolveNextOption({
        ...action,
        coordsMap,
        nameMap,
      });

      option.value = nextOption;
    } catch (error) {
      alert("出错了");
      console.error(error);
    }
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
    goMultiple: () => {
      updateOption({
        level: 3,
        name: "混合",
      });
    },
  };
};
