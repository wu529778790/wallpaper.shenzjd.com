<template>
  <div class="virtual-wapper" @scroll="onScroll">
    <div
      class="virtual-background"
      :style="{ height: totalHeight + 'px' }"></div>
    <div
      class="virtual-list"
      :style="{
        transform: `translate3d(0, ${startOffset}px, 0)`,
      }">
      <div
        v-for="item in virtualList"
        :key="item"
        class="item"
        :style="{ height: item.height + 'px' }">
        第{{ item.id }}个，高度{{ item.height }}px
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const data = ref(
  Array.from({ length: 200 }, (_, i) => {
    return {
      id: i + 1,
      height: generateRandomNumber(30, 200),
    };
  })
);

// 预估高度
const estimatedHeight = 100;

const totalHeight = ref(0);

// 起始索引
const startIndex = ref(0);

const hasVisibleHeight = ref(0);
const innerHeight = window.innerHeight;
// 显示行数
const visibaleCount = computed(() => {
  // 计算显示行数
  let i = 0;
  while (hasVisibleHeight.value < innerHeight) {
    hasVisibleHeight.value = hasVisibleHeight.value + data.value[i].height;
    i++;
  }
  return i;
});
// 结束索引
const endIndex = ref(0);
// 缓冲行数
const buffer = ref(2);
// // 缓冲起始索引
// const bufferStartIndex = computed(() => {
//   return Math.max(0, startIndex.value - buffer.value);
// });
// // 缓冲结束索引
// const bufferEndIndex = computed(() => {
//   return Math.min(data.value.length, endIndex.value + buffer.value);
// });
// // 顶部缓冲个数
// const topBufferLength = computed(() => {
//   return startIndex.value - Math.max(0, startIndex.value - buffer.value);
// });
// // 底部缓冲个数
// const bottomBufferLength = computed(() => {
//   return (
//     Math.min(endIndex.value + buffer.value, data.value.length) - endIndex.value
//   );
// });

const virtualList = computed(() => {
  return data.value.slice(startIndex.value, endIndex.value);
});

onBeforeMount(() => {
  // 预估总高度
  totalHeight.value =
    (data.value.length - visibaleCount.value) * estimatedHeight +
    hasVisibleHeight.value;
  endIndex.value = startIndex.value + visibaleCount.value;
});

const startOffset = ref(0);
const onScroll = (event) => {
  const scrollTop = event.target.scrollTop;
  startIndex.value = Math.floor(scrollTop / estimatedHeight);
  endIndex.value = Math.min(
    startIndex.value + visibaleCount.value,
    data.value.length
  );
  startOffset.value = scrollTop - (scrollTop % estimatedHeight);
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
