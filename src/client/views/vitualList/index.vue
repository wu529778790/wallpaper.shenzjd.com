<template>
  <div class="virtual-wapper" @scroll="onScroll">
    <div
      class="virtual-background"
      :style="{ height: totalHeight + 'px' }"></div>
    <div
      class="virtual-list"
      :style="{ transform: `translateY(${startTop}px)` }">
      <div
        v-for="item in virtualList"
        :key="item"
        class="item"
        :style="{ height: itemHeight + 'px' }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
const data = ref(Array.from({ length: 2000 }, (_, i) => i + 1));

const itemHeight = 100;

const totalHeight = computed(() => data.value.length * itemHeight);
const start = ref(0);
const count = ref(0);
const end = computed(() => start.value + count.value);
const virtualList = computed(() => {
  return data.value.slice(start.value, end.value);
});

onBeforeMount(() => {
  const { innerHeight } = window;
  count.value = Math.ceil(innerHeight / itemHeight);
});

const startTop = ref(0);
const onScroll = (e) => {
  const { scrollTop } = e.target;
  start.value = Math.floor(scrollTop / itemHeight);
  startTop.value =
    scrollTop % itemHeight
      ? Math.floor(scrollTop / itemHeight) * itemHeight
      : scrollTop;
};
</script>

<style lang="scss" scoped>
.virtual-wapper {
  height: 100%;
  position: relative;
  overflow: auto;
  .virtual-background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }
  .virtual-list {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    .item {
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
    }
  }
}
</style>
