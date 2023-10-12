import { ref } from "vue";
import { resolveNextOption } from "../steps";

export const useOption = ({ coordsMap = {}, nameMap = {} }) => {
  const option = ref(null);

  return {
    option,
    updateOption: (action) => {
      const nextOption = resolveNextOption({
        ...action,
        coordsMap,
        nameMap,
      });
      option.value = nextOption;
    },
    goUp: () => {},
    goDown: () => {},
  };
};
