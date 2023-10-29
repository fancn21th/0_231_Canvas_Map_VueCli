<script setup>
import Stats from 'stats.js';
import Foo from './components/foo/Foo.vue';
import { onMounted, onBeforeMount, shallowRef, provide } from 'vue';
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

const monitorRef = shallowRef(null);
const stats = new Stats();

provide('monitor', {
  animate,
  startAnimation: () => {
    requestAnimationFrame(animate);
  },
});

function animate(render) {
  stats.begin();

  // monitored code goes here
  render();

  stats.end();

  requestAnimationFrame(animate);
}

onMounted(() => {
  stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
  monitorRef.value.appendChild(stats.dom);
});
</script>

<template>
  <div class="container">
    <Foo />
    <div class="monitor" ref="monitorRef"></div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app,
.container {
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
