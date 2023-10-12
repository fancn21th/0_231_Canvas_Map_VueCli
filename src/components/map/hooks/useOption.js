import { ref } from "vue";
import { resolveNextOption } from "../steps";

export const useOption = ({ coordsMap = {} }) => {
  const option = ref(null);

  return {
    option,
    updateOption: (action) => {
      const nextOption = resolveNextOption({
        ...action,
        coordsMap,
      });
      option.value = nextOption;
    },
    goUp: () => {},
    goDown: () => {},
  };
};
