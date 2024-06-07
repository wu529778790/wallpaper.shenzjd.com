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
        transform: `translateY(${startOffset}px)`,
      }">
      <div
        v-for="(item, index) in virtualList"
        :key="item"
        :style="{ height: itemHeight + 'px' }">
        <slot name="item" :data="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  itemHeight: {
    type: Number,
    default: 0,
    requied: true,
  },
  // 缓冲行数
  buffer: {
    type: Number,
    default: 3,
  },
});

const totalHeight = computed(() => props.data.length * props.itemHeight);
// 起始索引
const startIndex = ref(0);
// 显示行数
const count = ref(0);
// 结束索引
const endIndex = ref(0);
// 缓冲起始索引
const bufferStartIndex = computed(() => {
  return Math.max(0, startIndex.value - props.buffer);
});
// 缓冲结束索引
const bufferEndIndex = computed(() => {
  return Math.min(endIndex.value + props.buffer, props.data.length);
});
// 顶部缓冲行数
const topBufferLength = computed(() => {
  return Math.max(0, startIndex.value - bufferStartIndex.value);
});
// 底部缓冲行数
const bottomBufferLength = computed(() => {
  return Math.max(0, bufferEndIndex.value - endIndex.value);
});

const virtualList = computed(() => {
  return props.data.slice(bufferStartIndex.value, bufferEndIndex.value);
});

onBeforeMount(() => {
  const { innerHeight } = window;
  count.value = Math.ceil(innerHeight / props.itemHeight);
  endIndex.value = startIndex.value + count.value;
});

const startOffset = ref(0);
const emit = defineEmits(["scrollToBottom"]);
const onScroll = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  startIndex.value = Math.floor(scrollTop / props.itemHeight);
  endIndex.value = Math.min(startIndex.value + count.value, props.data.length);
  startOffset.value = scrollTop - (scrollTop % props.itemHeight);
  // 如果滚动到底部
  if (scrollTop + clientHeight === scrollHeight) {
    emit("scrollToBottom");
  }
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
  }
}
</style>
