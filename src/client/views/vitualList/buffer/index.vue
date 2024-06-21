<template>
  <div class="virtual-wapper" @scroll="onScroll">
    <div
      class="virtual-background"
      :style="{ height: totalHeight + 'px' }"></div>
    <div
      class="virtual-list"
      :style="{
        top: -(topBufferLength * itemHeight) + 'px',
        bottom: -(bottomBufferLength * itemHeight) + 'px',
        transform: `translate3d(0, ${startOffset}px, 0)`,
      }">
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
const data = ref(Array.from({ length: 100 }, (_, i) => i + 1));

const itemHeight = 100;

const totalHeight = computed(() => data.value.length * itemHeight);
// 起始索引
const startIndex = ref(0);
// 显示行数
const count = ref(0);
// 结束索引
const endIndex = ref(0);
// 缓冲行数
const buffer = ref(2);
// 缓冲起始索引
const bufferStartIndex = computed(() => {
  return Math.max(0, startIndex.value - buffer.value);
});
// 缓冲结束索引
const bufferEndIndex = computed(() => {
  return Math.min(data.value.length, endIndex.value + buffer.value);
});
// 顶部缓冲个数
const topBufferLength = computed(() => {
  return startIndex.value - Math.max(0, startIndex.value - buffer.value);
});
// 底部缓冲个数
const bottomBufferLength = computed(() => {
  return (
    Math.min(endIndex.value + buffer.value, data.value.length) - endIndex.value
  );
});

const virtualList = computed(() => {
  return data.value.slice(bufferStartIndex.value, bufferEndIndex.value);
});

onBeforeMount(() => {
  const { innerHeight } = window;
  count.value = Math.ceil(innerHeight / itemHeight);
  endIndex.value = startIndex.value + count.value;
});

const startOffset = ref(0);
const onScroll = (event) => {
  const scrollTop = event.target.scrollTop;
  startIndex.value = Math.floor(scrollTop / itemHeight);
  endIndex.value = Math.min(startIndex.value + count.value, data.value.length);
  startOffset.value = scrollTop - (scrollTop % itemHeight);
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
    bottom: 0;
  }
  .virtual-list {
    position: absolute;
    left: 0;
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
