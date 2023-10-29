<script setup>
import Foo from './components/foo/Foo.vue';
import { onBeforeMount } from 'vue';
import { designWidthPx, designHeightPx, designWidth, designHeight } from './configs/layerConfig';

onBeforeMount(() => {
  const scale =
    document.documentElement.clientWidth / document.documentElement.clientHeight < designWidth / designHeight
      ? document.documentElement.clientWidth / designWidth
      : document.documentElement.clientHeight / designHeight;

  // refer to https://stackoverflow.com/questions/76090183/using-v-bind-to-set-css-vars-in-vue-3-composition-issue
  document.documentElement.style.setProperty('--design-width', designWidthPx);
  document.documentElement.style.setProperty('--design-height', designHeightPx);
  document.documentElement.style.setProperty('--scale', scale);
});
</script>

<template>
  <Foo />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#app {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  transform: scale(var(--scale));
  transform-origin: left top;
}
</style>
